---
title: Inverses of Hyperoperations
published: 2026-04-19
desc: I found a neat formula that recursively defines the inverses of the first two hyperoperations
---

$$ H_{x}^{-1}(a,b)=H_{x}(a,H_{x+1}(b,-1)) $$

The formula above is a neat way I found to define constructive inverses of the
first and second hyperoperations using other hyperoperations.

## Hyperoperations

First, a bit of background.

The basic arithmetic operations (e.g. addition and multiplication) are defined
in terms of each other. For example, multiplication is just repeatedly
performing addition. This shouldn't be news for you; you most certainly learned
this in grade school. The technical math term for this is the
[hyperoperation sequence](https://en.wikipedia.org/wiki/Hyperoperation).

### Successor

The zeroth hyperoperation, which is denoted $H_0$, is the
[successor function](https://en.wikipedia.org/wiki/Successor_function), which
just increments its input by $1$. For example, $H_0(5)=6$.

### Addition

The first hyperoperation, denoted $H_1$, is
[addition](https://en.wikipedia.org/wiki/Addition). It's defined as passing $a$
through the successor function $b$ times. Here's an example:

$$
\begin{aligned}
5+4       &= H_1(5, 4) \\
1+1+1+1+5 &= H_0(H_0(H_0(H_0(5)))) \\
1+1+1+6   &= H_0(H_0(H_0(6))) \\
1+1+7     &= H_0(H_0(7)) \\
1+8       &= H_0(8) \\
         &= 9
\end{aligned}
$$

### Multiplication

The second hyperoperation, denoted $H_2$, is
[multiplication](https://en.wikipedia.org/wiki/Multiplication). It's defined as
adding $a$ to itself $b$ times. Here's an example:

$$
\begin{aligned}
5 \times 4 &= H_2(5, 4) \\
5+5+5+5    &= H_1(5,H_1(5,H_1(5,5))) \\
5+5+10     &= H_1(5,H_1(5,10)) \\
5+15       &= H_1(5,15) \\
           &= 20
\end{aligned}
$$

### Exponentiation

The third hyperoperation, denoted $H_3$, is
[exponentiation](https://en.wikipedia.org/wiki/Exponentiation). It's defined as
multiplying $a$ by itself $b$ times. Here's an example:

$$
\begin{aligned}
5^4                          &= H_3(5, 4) \\
5 \times 5 \times 5 \times 5 &= H_2(5,H_2(5,H_2(5,5))) \\
5 \times 5 \times 25         &= H_2(5,H_2(5,25)) \\
5 \times 125                 &= H_2(5,125) \\
                             &= 625
\end{aligned}
$$

### Tetration

The fourth hyperoperation, denoted $H_4$, is
[tetration](https://en.wikipedia.org/wiki/Tetration). It's defined as raising
$a$ to its own power $b$ times. Here's an example:

$$
\begin{aligned}
{}^4 5               &= H_4(5, 4) \\
5^{5^{5^{5}}}        &= H_3(5,H_3(5,H_3(5,5))) \\
5^{5^{3125}}         &= H_3(5,H_3(5,3125)) \\
5^{(10^{2184.2813})} &= H_3(5,10^{2184.2813}) \\
                     &\approx 10^{10^{2184.1257}}
\end{aligned}
$$

Unfortunately, I can't show you the exact value of the result of the example
above, because it's simply too large.

That number is so large that there are more digits in that number than there are
atoms in the observable universe.

In fact, if each atom in the observable universe contained its own observable
universe, and each sub-atom in those observable universes contained its own
observable universe, and this nesting process repeated for 25 times in total,
the total number of atoms would _still_ be less than the number of digits in
that number.
[By over 100 orders of magnitude](https://www.wolframalpha.com/input?i=log10%28log10%285%5E%285%5E%285%5E5%29%29%29%29+-+log10%28%2810%5E80%29%5E%281%2B25%29%29).

Tetration doesn't mess around.

### And beyond

There are more hyperoperations (infinitely more, in fact), but there's really no
practical reason to ever use the higher ones. Even with tetration, you run into
"there aren't enough atoms in the observable universe to represent the number of
digits this number has" problems without even trying, and the higher
hyperoperations only make it worse.

## Inverses

Anyways, you might notice that the hyperoperation sequence doesn't include
subtraction or division. These operations are
[inverses](https://en.wikipedia.org/wiki/Inverse_function) of the
hyperoperations. In other words, each inverse hyperoperation precisely undoes
the actions of its corresponding hyperoperation.

However, unlike the hyperoperations themselves which follow a very predictable
sequence, the inverses are much more chaotic.

### Zeroth

The inverse of $H_0$ is the
[predecessor function](https://en.wikipedia.org/wiki/Primitive_recursive_function#Predecessor).
The successor function adds $1$ to a number, and the predecessor function
subtracts $1$ from a number. Very simple.

$$ H_0^{-1}(b)=b-1 $$

There are a few reasons why we can't use my formula to define the predecessor
function, but the most obvious is that the predecessor function only takes one
input, while my formula describes a function that takes two.

Onto the next one.

### First

The inverse of $H_1$ is
[subtraction](https://en.wikipedia.org/wiki/Subtraction). You obviously know how
subtraction works, though it's possible that you might have to think for a bit
in order to come up with a rigorous constructive definition (i.e. not just "a
function that returns the value you'd need to add to $a$ in order to get $b$.").

The best way I know of to do this is to use addition and multiplication:

$$ a-b = a+(b \times -1) $$

Or, in hyperoperation notation:

$$ H_1^{-1}(a,b) = H_1(a,H_2(b, -1)) $$

This looks a lot like my formula! That's because it is. If you set $x=1$, my
formula directly produces the one above:

$$
\begin{aligned}
H_{x}^{-1}(a,b) &= H_{x}(a,H_{x+1}(b,-1)) \\
&\downarrow x=1 \\
H_{1}^{-1}(a,b) &= H_{1}(a,H_{1+1}(b,-1)) \\
&\downarrow \\
H_{1}^{-1}(a,b) &= H_{1}(a,H_{2}(b,-1))
\end{aligned}
$$

Neat! Let's see if the pattern holds.

### Second

The inverse of $H_2$ is
[division](https://en.wikipedia.org/wiki/Division_(mathematics)). Again, you
know how division works, even though you might have to think a bit to define it
constructively.

The best definition I know of uses multiplication and exponentation:

$$ \frac{a}{b} = a \times (b^{-1}) $$

This seems eerily similar to our definition for subtraction. "Use the
hyperoperation you're inverting but pass the second value through the next
hyperoperation along with $-1$". And in fact, if we set $x=2$, my formula
produces the expected result.

$$
\begin{aligned}
H_{x}^{-1}(a,b) &= H_{x}(a,H_{x+1}(b,-1)) \\
&\downarrow x=2 \\
H_{2}^{-1}(a,b) &= H_{2}(a,H_{2+1}(b,-1)) \\
&\downarrow \\
H_{2}^{-1}(a,b) &= H_{2}(a,H_{3}(b,-1))
\end{aligned}
$$

If the formula has held twice now, it'll probably hold for the rest too. Let's
see!

### Third

The inverse of $H_3$ is... well... it's complicated. Exponentiation actually has
two inverses: [roots](https://en.wikipedia.org/wiki/Nth_root) and
[logarithms](https://en.wikipedia.org/wiki/Logarithm). We'll get to why it has
two later.

First, let's try to apply my formula:

$$
\begin{aligned}
H_{x}^{-1}(a,b) &= H_{x}(a,H_{x+1}(b,-1)) \\
&\downarrow x=3 \\
H_{3}^{-1}(a,b) &= H_{3}(a,H_{3+1}(b,-1)) \\
&\downarrow \\
H_{3}^{-1}(a,b) &= H_{3}(a,H_{4}(b,-1))
\end{aligned}
$$

Aaaand stop right there. We just tried to use $H_4(b, -1)$, which means
tetrating with a height of $-1$. That's not allowed.

There's a case to be made that ${}^{-1}b = 0$ for any $b$, but you run into
contradictions if you assume this, similar to what happens if you divide by $0$.
Most mathematicians agree that, for $H_4$ and up, the domain of the second
argument is $b \geq 0$ in most cases.

My formula clearly doesn't work for the inverse(s) of exponentiation, so what
_does_ work?

#### Roots

As mentioned, the left inverse of $H_3$ is the root. As usual, you probably know
how roots work, but a constructive definition might require a bit of thought.

You might remember that $a^{\frac{1}{2}}=\sqrt{a}$. You can generalize this to
$a^{\frac{1}{b}}=\sqrt[b]{a}$. From there, you can rearrange the fractional
exponent to get $a^{(b^{-1})}=\sqrt[b]{a}$. Which is, in hyperoperation
notation:

$$ H_3^{-1L}(a,b) = H_3(a, H_3(b,-1)) $$

So rather than passing the second value through the next hyperoperation
($H_{x+1}$) along with $-1$, you just pass it through the same hyperoperation
($H_x$). Weird!

#### Logarithms

The right inverse of $H_3$ is the logarithm. Logarithms are way weirder than any
other hyperoperation or inverse hyperoperation below tetration.

For starters, logarithms often produce
[transcendental](https://en.wikipedia.org/wiki/Transcendental_number) numbers as
results. While you can construct equations that use logarithms and only include
normal numbers (e.g. $\log_4(64) = 3$), their default behavior is to spew
transcendental numbers.

The typical definition for logarithms is this:

$$ \log_b(a) = c \Leftrightarrow b^c = a $$

This works, but it's an implicit definition. If you want to actually solve for
the value of a given logarithm, you have to guess-and-check, which sucks. We
want a constructive definition.

Here's my preferred constructive definition of logarithms, derived using the
[integral definition](https://en.wikipedia.org/wiki/Natural_logarithm#Integral_definition)
of the natural logarithm and the
[change of base formula](https://en.wikipedia.org/wiki/List_of_logarithmic_identities#Changing_the_base):

$$ H_3^{-1R}(a,b) = \log_b(a) = \frac{\int_{1}^{a} \frac{1}{t} \, dt}{\int_{1}^{b} \frac{1}{t} \, dt} $$

Eww. Integrals? In the definition of an arithmetic operation? Unfortunately,
because logarithms are transcendental, you by definition can't constructively
define them using finite algebra. So we have to use at least some calculus.
Still gross though.

### Fourth

Like exponentiation, tetration has two inverses. They're very creatively named
[super-root](https://en.wikipedia.org/wiki/Tetration#Super-root) and
[super-logarithm](https://en.wikipedia.org/wiki/Tetration#Super-logarithm).

Because tetration gets really weird really fast (and also it's only defined for
natural numbers), it's difficult to create general constructive definitions.

And besides, it should be clear by now that my formula isn't going to apply to
the higher hyperoperations.

## Why does the pattern break?

Well, for a lot of reasons, but the most prominent reason is that addition and
multiplication are commutative, but exponentiation is not:

$$
\begin{aligned}
a + b &= b + a \\
a \times b &= b \times a \\
a^b &\neq b^a
\end{aligned}
$$

There's also the aforementioned "tetration is not defined for $b=-1$" problem,
but non-commutativity is the root (ba-dum-tss) of the issue.

For example, non-commutativity is the reason why the higher hyperoperations have
two inverses. Inverses are about calculating the value of one input using only
the other input and the output. If the same inverse function could calculate
either input of a non-commutative function, the inputs of the function must be
structurally the same. If the inputs must be structurally the same, they must be
interchangeable. If the inputs must be interchangeable, the function must be
commutative, which is a contradiction. Therefore, non-commutative functions must
have multiple inverses.

## Why is exponentiation non-commutative?

Because it is.

I wish I had a more satisfying explanation, but I don't. Why exactly the pattern
of commutativity holds for $H_1$ and $H_2$ but breaks at $H_3$ is difficult to
explain without either going in circles or just kicking the "because it is" can
slightly further.

For example, one explanation goes like so:

> Below is a table of what effect each input of each hyperoperation has when
> varied.
>
> | Hyperoperation | First Input ($a$) | Second Input ($b$) |
> | -------------- | ----------------- | ------------------ |
> | Addition       | Additive effect   | Additive effect    |
> | Multiplication | Linear effect     | Linear effect      |
> | Exponentiation | Polynomial effect | Exponential effect |
>
> Because the inputs of exponentiation have different effects, they aren't
> interchangeable. Therefore, exponentiation isn't commutative.

And while this is true, it just begs the question "but why do the inputs of
exponentiation have different effects?", for which the answer is either "because
exponentiation isn't commutative" or "because they do". In other words: either
circular logic or an unjustified assertion.

See why this is tricky?

If you have a satisfying explanation for why exponentiation is non-commutative
that isn't circular or assertive, I would really really love to hear it. Please
[email me](mailto:ethmarks.dev@gmail.com) if you do.

## Conclusion

I'm 99.99% sure that I'm not the first person to discover "my" formula, though I
did at least discover it independently and I couldn't find my exact formulation
anywhere online.

The fact that you can construct each of the arithmetic operations in terms of
the others is delightful to me (examples below), and I thought that the pattern
in the definitions of subtraction and division was interesting, so I formalized
it.

$$
\begin{aligned}
a + b &= a-(0-b) \\
a - b &= a+(b \times -1) \\
a \times b &= a/(1/b) \\
a / b &= a \times (b^{-1})
\end{aligned}
$$

Anyways, thanks for reading!

~Ethan
