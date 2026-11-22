-- Add unique usernames while preserving existing accounts.
ALTER TABLE "users" ADD COLUMN "username" TEXT;

WITH normalized AS (
  SELECT
    "id",
    COALESCE(
      NULLIF(
        lower(regexp_replace(split_part("email", '@', 1), '[^a-zA-Z0-9._-]', '', 'g')),
        ''
      ),
      'user-' || substr(replace("id", '-', ''), 1, 8)
    ) AS base_username
  FROM "users"
),
ranked AS (
  SELECT
    "id",
    base_username,
    COUNT(*) OVER (PARTITION BY base_username) AS duplicate_count
  FROM normalized
)
UPDATE "users" AS u
SET "username" = CASE
  WHEN ranked.duplicate_count = 1 THEN ranked.base_username
  ELSE ranked.base_username || '-' || substr(replace(u."id", '-', ''), 1, 8)
END
FROM ranked
WHERE u."id" = ranked."id";

ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
