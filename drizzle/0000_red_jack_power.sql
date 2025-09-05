CREATE TABLE IF NOT EXISTS "maintenances" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "maintenances_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"vehiculeId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"dateDone" date NOT NULL,
	"dateToDo" date NOT NULL,
	"cost" integer DEFAULT 0 NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicules" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vehicules_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer DEFAULT 2000 NOT NULL,
	"kilometers" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehiculeId_vehicules_id_fk" FOREIGN KEY ("vehiculeId") REFERENCES "public"."vehicules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
