# Test Email Templates — Session 7 Demo

These email templates are used during the live demo and the hands-on exercises. Copy each body into a fresh email on your phone or a second browser account, then send to your workshop account with the specified subject.

Sending from a different device or account (rather than composing in the same tab as Workspace Studio) makes the "live fire" more convincing for participants — they see the email arrive as an external event.

---

## Test Email #1 — Urgent Student (primary demo trigger)

**Use for:** The live demo trigger in the main walkthrough.
**Expected flow behavior:** Gemini should classify as `URGENT_STUDENT` → Chat notification fires → Gmail label applied.

**Subject:**

```
[DEMO] Can I get an extension on CA Test 2?
```

**Body:**

```
Dear Dr. Tan,

I've been unwell this week with a bad flu and I'm really worried
about CA Test 2 on Monday 20 April. I have a medical certificate
that I can submit through the Student Portal.

Could I possibly take the make-up test, or get some extra time?
I'm also struggling quite badly with hypothesis testing — I've
watched the lecture recording twice but the concepts aren't
clicking. Would it be possible to book a consultation slot this
week?

Thanks so much,
Chen Mei Ling (2401003)
ST0001 Statistics I, Tutorial Group B
```

---

## Test Email #2 — Positive Feedback (iteration beat)

**Use for:** The "iterate on the flow" demo beat — shows the flow correctly NOT firing for positive emails.
**Expected flow behavior:** Gemini should classify as `OTHER` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] Thanks for the tutorial yesterday!
```

**Body:**

```
Hi Dr. Tan,

Just wanted to drop a quick note to say thank you for Monday's
tutorial on probability distributions. The worked example with
the dice problem really helped me understand conditional
probability — it finally clicked!

I shared the approach with my study group and we all agreed
it made the homework much easier. Looking forward to next week's
session on sampling distributions.

Thanks,
Bryan Tan (2401002)
```

---

## Test Email #3 — Admin Request (edge case)

**Use for:** Optional — showing the flow correctly categorising a non-urgent admin email.
**Expected flow behavior:** Gemini should classify as `ADMIN_REQUEST` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] Room booking for consultation session
```

**Body:**

```
Hi Dr. Tan,

I need to book a room for a group consultation session next
Thursday afternoon. Could you confirm that T1602 is available
from 3:00 PM to 4:30 PM on 23 April? If not, is there another
staff room I could use?

I've already filled in the facilities booking form and am
waiting on your approval.

Thanks,
Kumar Raj (2401010)
```

---

## Test Email #4 — Newsletter (edge case)

**Use for:** Optional — showing the flow correctly filtering out routine mailing lists.
**Expected flow behavior:** Gemini should classify as `NEWSLETTER` → `Check if` does not fire → no Chat ping.

**Subject:**

```
[DEMO] SP Weekly Staff Bulletin — 10 April
```

**Body:**

```
Dear Colleague,

This week's staff bulletin highlights:

- New research grant opportunities from the Ministry of Education
- Updates to the academic calendar for AY2026/2027
- Staff welfare event: Family Day at Sentosa on 25 April
- Reminder: Submit your module review forms by 30 April
- Library hours during the mid-semester break

Read the full bulletin at intranet.sp.edu.sg/staff-bulletin.

Kind regards,
SP Staff Communications
```

---

## Test Email #5 — Deadline in Body (for Scenario B: Email-to-Task Extractor)

**Use for:** Verifying the Intermediate exercise (Scenario B). Tests whether a participant's flow can extract an action item and deadline from an email body.
**Expected flow behavior:** Participant's flow should extract "Submit grades" as the action and `2026-05-15` as the deadline, create a Google Task, and send a Chat confirmation.

**Subject:**

```
[EXERCISE] Grades submission reminder
```

**Body:**

```
Dear Module Coordinators,

A friendly reminder that all final grades for Semester 2 must be
submitted through the Student Management System no later than
5:00 PM on Friday, 15 May 2026. Late submissions will delay the
student transcript release.

Please ensure your grade entries include:
- CA Test 1, CA Test 2, and Final Exam scores
- Final weighted grade (calculated automatically)
- Any special remarks for students with Leave of Absence cases

If you have any questions, contact Academic Records at
acad_records@sp.edu.sg.

Regards,
Academic Records Office
```

---

## Tips for Sending Test Emails During the Demo

- **Send from a different device.** Composing the email in the same browser tab as Workspace Studio looks staged. Using your phone makes it visibly "external" to participants.
- **Pause briefly after sending.** Don't immediately switch windows. Let participants see the `Sent` confirmation on your phone, then switch to Chat and wait for the notification to arrive organically.
- **Have Chat open full-screen.** A Chat notification is much more impressive in a full window than in a small side panel.
- **Pre-clear your Chat space.** If you're reusing a test space, clear old messages first so the fresh notification stands out.
