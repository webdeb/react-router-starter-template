CREATE TABLE `counters` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` integer NOT NULL DEFAULT 0,
	`created_at` integer NOT NULL DEFAULT (unixepoch()),
	`updated_at` integer NOT NULL DEFAULT (unixepoch())
); 