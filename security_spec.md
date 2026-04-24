# Security Specification - RentMate

## Data Invariants
1. A property must have a valid `ownerId` that matches the authenticated user's UID.
2. A user can only edit their own profile.
3. Inquiries can only be created by authenticated students.
4. Ratings must be between 1 and 5.
5. Prices must be positive numbers.
6. Identity roles (`role`) are immutable after initial registration.

## The Dirty Dozen Payloads
1. **Malicious Role Update**: Attempt to change `role` from 'student' to 'owner' via client SDK on an existing user doc.
2. **Identity Spoofing**: Create a property listing with someone else's `ownerId`.
3. **Ghost Property Creation**: Create a property without required fields (e.g., missing `city` or `type`).
4. **Denial of Wallet (ID Poisoning)**: Try to create a document with a 2MB long ID string.
5. **PII Breach**: Authenticated student tries to read all documents in `/users` collection to scrape emails.
6. **Price Manipulation**: Update a property's price to a negative value or a string.
7. **Cross-User Inquiry**: Student A tries to update an inquiry sent by Student B.
8. **Rating Injection**: Set a property's rating to 99 via update.
9. **Distance Poisoning**: Set `distance` to a non-number type.
10. **State Skipping**: Manually update an Inquiry status from 'pending' to 'closed' bypassing owner contact logic.
11. **Shadow Field Injection**: Add `isVerified: true` to a property creation payload.
12. **Blanket Query**: Request `getDocs(collection(db, 'properties'))` without any filters as an unauthenticated user (if restricted).

## Test Runner Logic
The following tests will ensure all above payloads return PERMISSION_DENIED.
