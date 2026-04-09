# ST0001 Statistics I — Tutorial 3: Probability

**School of Mathematical Sciences and Analytics, Singapore Polytechnic**
**Week 3 | To be completed during tutorial session**

---

## Question 1: Basic Probability

A polytechnic cafeteria offers 4 types of main dishes (chicken rice, nasi lemak, fish soup, mee rebus) and 3 types of drinks (teh, kopi, iced lemon tea).

(a) How many different meal combinations (one main + one drink) are possible?

(b) If a student chooses a meal combination at random, what is the probability they select chicken rice with kopi?

(c) What is the probability that they select nasi lemak with any drink?

---

## Question 2: Addition Rule

In a survey of 150 Year 1 SP students:
- 68 students are enrolled in a Data Science diploma
- 45 students are enrolled in a Business Analytics diploma
- 12 students are enrolled in both (through a cross-listed elective)

(a) What is the probability that a randomly selected student is enrolled in Data Science or Business Analytics?

(b) Are the events "enrolled in Data Science" and "enrolled in Business Analytics" mutually exclusive? Explain.

(c) What is the probability that a randomly selected student is enrolled in neither Data Science nor Business Analytics?

---

## Question 3: Conditional Probability

The table below shows the results of a study on study method preferences among 200 SP students, classified by GPA range.

|  | Alone | Study Group | Online Resources | Total |
|---|---|---|---|---|
| GPA 3.0 and above | 28 | 35 | 17 | 80 |
| GPA below 3.0 | 42 | 30 | 48 | 120 |
| **Total** | **70** | **65** | **65** | **200** |

(a) What is the probability that a randomly selected student prefers to study alone?

(b) What is the probability that a student has a GPA of 3.0 and above, given that they prefer study groups?

(c) What is the probability that a student prefers online resources, given that their GPA is below 3.0?

(d) Based on your calculations, does the preferred study method appear to be independent of GPA range? Justify your answer using probability values.

---

## Question 4: Multiplication Rule and Independence

A lecturer has observed the following probabilities for ST0001 students:
- The probability that a student attends all tutorials is 0.65.
- The probability that a student passes the final exam is 0.80.
- The probability that a student both attends all tutorials AND passes the final exam is 0.60.

(a) Are the events "attends all tutorials" and "passes the final exam" independent? Show your working.

(b) What is the probability that a student passes the final exam, given that they attended all tutorials?

(c) What is the probability that a student who did NOT attend all tutorials still passes the final exam?

(d) What conclusion can you draw about the relationship between tutorial attendance and exam performance? Does this prove that attending tutorials causes better exam results? Explain.

---

## Question 5: Complement Rule and Combined Concepts

A quality control process at a semiconductor factory tests chips from three production lines:
- Line A produces 50% of all chips, with a 3% defect rate
- Line B produces 30% of all chips, with a 5% defect rate
- Line C produces 20% of all chips, with a 2% defect rate

(a) What is the probability that a randomly selected chip is from Line A AND is defective?

(b) What is the overall probability that a randomly selected chip is defective?

(c) If a chip is found to be defective, what is the probability it came from Line B?
*(Hint: Use Bayes' theorem or a tree diagram.)*

(d) The factory claims that fewer than 4% of all chips are defective. Based on your calculation in (b), is this claim justified?

---

## Question 6: Counting Techniques

(a) A student club committee needs to elect a President, Vice-President, and Secretary from 10 nominees. How many different leadership teams are possible? State whether this is a permutation or combination problem and explain why.

(b) A tutorial group of 8 students needs to form teams of 3 for a group project. How many different teams are possible?

(c) A multiple-choice quiz has 10 questions, each with 4 options (A, B, C, D). If a student guesses randomly on every question, what is the probability of getting all 10 correct?

---

## Challenge Question

A ride-hailing company claims that the average waiting time for a ride in the Clementi area is 5 minutes. You suspect the actual average waiting time is longer. Over one week, you record the waiting times of 20 rides and obtain the following data:

6.2, 4.8, 7.1, 5.5, 6.0, 4.3, 5.9, 7.4, 5.2, 6.8,
5.7, 6.5, 4.9, 5.1, 6.3, 7.0, 5.8, 6.1, 5.4, 6.6

(a) Using the concepts from this week: if the company's claim is true (μ = 5 minutes), and the data follows a normal distribution, would you consider your sample mean to be an unusual result? Explain your reasoning qualitatively — you do not need to perform a formal hypothesis test.

(b) In Week 5, you will learn how to formally test this claim using a hypothesis test. For now, state what your null and alternative hypotheses would be.

*(This question bridges the gap between probability (this week) and hypothesis testing (Week 5). It will make more sense when we revisit it later.)*

---

## Formula Reference

| Formula | Use when |
|---------|----------|
| P(A') = 1 − P(A) | Finding the probability of an event NOT happening |
| P(A or B) = P(A) + P(B) − P(A and B) | Finding probability of either event (general) |
| P(A or B) = P(A) + P(B) | Either event, when mutually exclusive |
| P(A and B) = P(A) × P(B given A) | Both events happening (general) |
| P(A and B) = P(A) × P(B) | Both events, when independent |
| P(A given B) = P(A and B) / P(B) | Probability of A knowing B occurred |
| nPr = n! / (n−r)! | Ordered arrangements (permutations) |
| nCr = n! / (r!(n−r)!) | Unordered selections (combinations) |
