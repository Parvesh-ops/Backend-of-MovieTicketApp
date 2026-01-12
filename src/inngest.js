import { Inngest } from "inngest";
import asyncHandler from "express-async-handler";
import User from "./models/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// ---- Inngest function to save user data ----
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  asyncHandler(async ({ event }) => {
    const { first_name = "", last_name = "", email_address = [], image_url = "" } = event.data;

    const email = email_address?.[0]?.email_address;
    if (!email) throw new Error("Email missing in Clerk event");

    const userData = {
      email,
      name: `${first_name.trim()} ${last_name.trim()}`.trim(),
      image: image_url
    };

    // Upsert user to avoid duplicates
    const user = await User.findOneAndUpdate(
      { email },
      userData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("User synced:", user.email);
  })
);

// ---- Inngest function to delete user data ----
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  asyncHandler(async ({ event }) => {
    const { email } = event.data;
    if (!email) throw new Error("Email missing for deletion");

    const deletedUser = await User.findOneAndDelete({ email });
    if (deletedUser) console.log("User deleted:", deletedUser.email);
    else console.warn("No user found to delete for email:", email);
  })
);

// ---- Inngest function to update user data ----
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.update" },
  asyncHandler(async ({ event }) => {
    const { first_name = "", last_name = "", email_address = [], image_url = "" } = event.data;

    const email = email_address?.[0]?.email_address;
    if (!email) throw new Error("Email missing for update");

    const userData = {
      name: `${first_name.trim()} ${last_name.trim()}`.trim(),
      image: image_url
    };

    const updatedUser = await User.findOneAndUpdate(
      { email },
      userData,
      { new: true }
    );

    if (updatedUser) console.log("User updated:", updatedUser.email);
    else console.warn("No user found to update for email:", email);
  })
);

// Export all functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdate];




/*
example:

import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "my-app" });

// Your new function:
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

// Add the function to the exported array:
export const functions = [
  helloWorld
]; 
*/