# ST0001 Statistics I — Week 3: Introduction to Probability

**Lecturer:** Dr. Tan Wei Lin
**School of Mathematical Sciences and Analytics, Singapore Polytechnic**
**Academic Year 2025/2026, Semester 2**

---

## 3.1 What is Probability?

Probability is a measure of how likely an event is to occur. It is expressed as a number between 0 and 1, where:
- **P(event) = 0** means the event is impossible
- **P(event) = 1** means the event is certain
- Values between 0 and 1 indicate varying degrees of likelihood

Probability is foundational to statistics because it allows us to quantify uncertainty. When we collect a sample and draw conclusions about a population, we are making probabilistic statements.

### Three Approaches to Probability

**Classical (Theoretical) Probability:**
Based on equally likely outcomes.

P(A) = Number of outcomes favourable to A / Total number of possible outcomes

*Example:* The probability of rolling a 4 on a fair six-sided die is 1/6 ≈ 0.167.

**Relative Frequency (Empirical) Probability:**
Based on observed data from experiments or historical records.

P(A) = Number of times A occurred / Total number of trials

*Example:* If 847 out of 1,203 students responded to a survey, the probability that a randomly selected student responded is 847/1203 ≈ 0.704.

**Subjective Probability:**
Based on personal judgement, experience, or expert opinion. Not based on formal calculation.

*Example:* A financial analyst estimates there is a 70% chance of a market correction in Q3.

---

## 3.2 Basic Probability Terminology

**Experiment:** A process that produces a well-defined outcome.
*Example:* Tossing a coin, measuring commute times of SP students.

**Sample Space (S):** The set of all possible outcomes of an experiment.
*Example:* For a coin toss: S = {Heads, Tails}
*Example:* For rolling a die: S = {1, 2, 3, 4, 5, 6}

**Event:** A subset of the sample space — one or more outcomes.
*Example:* "Rolling an even number" = {2, 4, 6}

**Complement of an Event (A'):** All outcomes in the sample space that are NOT in event A.
P(A') = 1 − P(A)

*Example:* If P(rain tomorrow) = 0.3, then P(no rain tomorrow) = 1 − 0.3 = 0.7.

**Mutually Exclusive Events:** Two events that cannot occur at the same time.
*Example:* "Rolling a 3" and "Rolling a 5" on a single die roll.
If A and B are mutually exclusive: P(A and B) = 0.

**Exhaustive Events:** A set of events that covers all possible outcomes.
*Example:* {Even, Odd} for a die roll is exhaustive.

---

## 3.3 Probability Rules

### Rule 1: Addition Rule

For any two events A and B:

**P(A or B) = P(A) + P(B) − P(A and B)**

If A and B are mutually exclusive:

**P(A or B) = P(A) + P(B)**

*Example:* In a class of 30 students, 18 study Data Science, 10 study Business Analytics, and 4 study both (double-counting in this simplified scenario). What is the probability that a randomly selected student studies Data Science or Business Analytics?

P(DS or BA) = P(DS) + P(BA) − P(DS and BA)
= 18/30 + 10/30 − 4/30
= 24/30
= 0.80

### Rule 2: Multiplication Rule

For any two events A and B:

**P(A and B) = P(A) × P(B | A)**

If A and B are independent:

**P(A and B) = P(A) × P(B)**

*Example:* The probability that a randomly selected SP student commutes more than 45 minutes is 0.30. The probability that a student who commutes more than 45 minutes reports high stress (≥ 7 on a 10-point scale) is 0.55. What is the probability that a randomly selected student both commutes more than 45 minutes AND reports high stress?

P(Long commute and High stress) = P(Long commute) × P(High stress | Long commute)
= 0.30 × 0.55
= 0.165

### Rule 3: Complement Rule

**P(A') = 1 − P(A)**

*Example:* If the probability of passing ST0001 is 0.82, the probability of NOT passing is:
P(Not passing) = 1 − 0.82 = 0.18

---

## 3.4 Conditional Probability

Conditional probability measures the probability of an event occurring given that another event has already occurred.

**P(A | B) = P(A and B) / P(B)**, provided P(B) > 0

Read "P(A given B)" as "the probability of A, given that B has occurred."

### Worked Example

A survey of 200 SP students produced the following data on exercise frequency and stress levels:

|  | Low Stress (1–4) | High Stress (5–10) | Total |
|---|---|---|---|
| Exercises regularly (3+ times/week) | 52 | 28 | 80 |
| Does not exercise regularly | 38 | 82 | 120 |
| **Total** | **90** | **110** | **200** |

(a) What is the probability that a randomly selected student has high stress?
P(High stress) = 110/200 = 0.55

(b) What is the probability that a student has high stress, given that they exercise regularly?
P(High stress | Exercises regularly) = 28/80 = 0.35

(c) What is the probability that a student exercises regularly, given that they have low stress?
P(Exercises regularly | Low stress) = 52/90 = 0.578

**Observation:** Among students who exercise regularly, only 35% report high stress, compared to 55% overall. This suggests an association between exercise and lower stress — though we cannot conclude causation from observational data alone. (We will revisit this distinction in Week 7: Correlation.)

---

## 3.5 Independent Events

Two events A and B are **independent** if the occurrence of one does not affect the probability of the other.

Mathematically: A and B are independent if and only if **P(A | B) = P(A)**, or equivalently **P(A and B) = P(A) × P(B)**.

### Testing for Independence

From the exercise/stress example above:
- P(High stress) = 0.55
- P(High stress | Exercises regularly) = 0.35

Since 0.55 ≠ 0.35, the events "high stress" and "exercises regularly" are **not independent**. Knowing that a student exercises regularly changes the probability of them having high stress.

### Common Misconception

Students often confuse **independent events** with **mutually exclusive events**.
- Mutually exclusive: Events cannot happen at the same time. P(A and B) = 0.
- Independent: One event does not affect the other. P(A and B) = P(A) × P(B).

If two events are mutually exclusive and both have non-zero probability, they **cannot** be independent. (Knowing one happened tells you the other definitely didn't.)

---

## 3.6 Counting Techniques (Brief Overview)

When sample spaces are large, we use counting rules to determine the number of possible outcomes.

**Multiplication Principle:** If task 1 can be done in m ways and task 2 can be done in n ways, both tasks can be done in m × n ways.

**Permutations:** Ordered arrangements. The number of ways to arrange r items from n items:
nPr = n! / (n − r)!

**Combinations:** Unordered selections. The number of ways to choose r items from n items:
nCr = n! / (r! × (n − r)!)

*Example:* A committee of 3 students is to be selected from a class of 30. How many different committees are possible?

30C3 = 30! / (3! × 27!) = (30 × 29 × 28) / (3 × 2 × 1) = 4,060

---

## 3.7 Summary

| Concept | Key Formula |
|---------|-------------|
| Complement | P(A') = 1 − P(A) |
| Addition (general) | P(A or B) = P(A) + P(B) − P(A and B) |
| Addition (mutually exclusive) | P(A or B) = P(A) + P(B) |
| Multiplication (general) | P(A and B) = P(A) × P(B given A) |
| Multiplication (independent) | P(A and B) = P(A) × P(B) |
| Conditional probability | P(A given B) = P(A and B) / P(B) |
| Permutations | nPr = n! / (n − r)! |
| Combinations | nCr = n! / (r!(n − r)!) |

---

## Looking Ahead

In **Week 4**, we will build on these probability foundations to study **probability distributions** — mathematical models that describe the likelihood of different outcomes. We will focus on the **binomial distribution** (for counting successes in a fixed number of trials) and the **normal distribution** (the bell curve that underpins much of statistical inference).

The conditional probability and independence concepts from this week are essential for understanding how distributions work and how we make inferences from data.

---

## Recommended Practice

- Tutorial 3 worksheet (available on Google Classroom)
- OpenStax Introductory Statistics, Chapter 3: Probability Topics
- Khan Academy: "Basic probability" and "Conditional probability"
