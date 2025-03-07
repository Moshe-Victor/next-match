When matching the User model with the Member model it shows an error

Error parsing attribute "@relation": The relation field `member` on Model `User` is required.
This is no longer valid because it's not possible to enforce this constraint on the database level.
Please change the field type from `Member` to `Member?` to fix this.

We need to make member optional regardless we want it to be required. We follow prisma rules.

This is a one to one relationship.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  passwordHash  String
  image         String?
  accounts      Account[]
  member        Member?

  @@map("users")
}

model Member {
  id          String   @id @default(cuid())
  userId      String   @unique
  name        String
  gender      String
  dateOfBirth DateTime
  created     DateTime @default(now())
  updated     DateTime @default(now())
  description String
  city        String
  country     String
  image       String?
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```


`npm exec prisma db push` or `npx prisma db push`


