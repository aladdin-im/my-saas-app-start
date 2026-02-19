ALTER TABLE "order" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;