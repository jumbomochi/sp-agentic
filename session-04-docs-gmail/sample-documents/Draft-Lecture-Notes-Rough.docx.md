# ST0001 Week 5 - Hypothesis Testing

dr tan wei lin
draft - needs cleanup before uploading to classroom

---

## what is hypothesis testing

its basically a way to test a claim about a population using sample data. for example if someone says "the average commute time for SP students is 30 minutes" we can collect data and test whether that's true.

two hypotheses:
- null hypothesis H0: the claim we're testing (status quo). eg mu = 30
- alternative hypothesis H1 or Ha: what we think might be true instead. eg mu ≠ 30 or mu > 30 or mu < 30

the idea is we assume H0 is true and see if the data gives us enough evidence to reject it.

## types of tests

one tailed vs two tailed. one tailed is when we only care about one direction (greater than or less than). two tailed is when we care about both directions (not equal to).

when to use which:
- "is the mean different from 500?" → two tailed
- "is the mean less than 500?" → one tailed (left)
- "is the mean more than 500?" → one tailed (right)

## significance level

alpha (α) is the significance level. its the probability of rejecting H0 when its actually true (type I error). common values are 0.05, 0.01, 0.10.

we usually use 0.05 in this module unless stated otherwise.

## test statistics

for testing a population mean:

if population std dev is known: use z-test
z = (xbar - mu0) / (sigma / sqrt(n))

if population std dev is unknown: use t-test
t = (xbar - mu0) / (s / sqrt(n))
degrees of freedom = n - 1

IMPORTANT: students keep confusing these two. need to emphasise that in practice we almost always use t-test because we rarely know the population std dev.

## steps

1. state H0 and H1
2. choose significance level (alpha)
3. calculate the test statistic
4. find the critical value OR p-value
5. make a decision: reject or fail to reject H0
6. state conclusion in context

NOTE TO SELF: need to add worked example here. maybe the cereal box one from the textbook? or create something more relatable for students... commute times? grab delivery times?

## p-value approach

p-value = probability of getting a test statistic as extreme as (or more extreme than) the one calculated, assuming H0 is true.

decision rule:
- if p-value ≤ α → reject H0
- if p-value > α → fail to reject H0

common mistake: students say "accept H0" instead of "fail to reject H0". we never accept H0, we only fail to find enough evidence against it. need to hammer this point.

## type I and type II errors

type I error: rejecting H0 when its true (false positive)
probability = α

type II error: failing to reject H0 when its false (false negative)
probability = β

power of a test = 1 - β = probability of correctly rejecting H0

[TODO: add a table with examples of type I and type II errors in context. maybe medical testing example?]

## things to add before upload

- [ ] proper formatting with numbered sections
- [ ] at least 2 worked examples with full solutions
- [ ] diagrams showing rejection regions for one-tailed and two-tailed tests
- [ ] practice questions at the end (3-4 questions, mix of z and t tests)
- [ ] summary box at the end with key formulas
- [ ] check for any informal language that should be more academic
- [ ] add reference to relevant tutorial worksheet
