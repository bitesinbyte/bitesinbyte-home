import { BitesIllustration } from "@/components/bites-illustration";
import { RevealSection } from "@/components/home/reveal-section";

export function WhyBitesSection() {
  return (
    <section id="why-bites" className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-24">
        <RevealSection>
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              Fun fact
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why &ldquo;Bites In Byte&rdquo;?
            </h2>
          </div>
        </RevealSection>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <RevealSection>
            <div className="flex justify-center">
              <BitesIllustration className="w-full max-w-md" />
            </div>
          </RevealSection>

          <RevealSection>
            <div className="space-y-6">
              <div className="rounded-xl border bg-muted/30 p-5">
                <p className="font-mono text-sm text-muted-foreground">
                  <span className="text-foreground/40 line-through">bitsinbyte</span>{" "}
                  &rarr;{" "}
                  <span className="font-semibold text-foreground">bitesinbyte</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We originally wanted{" "}
                  <strong className="text-foreground">&ldquo;bitsinbyte&rdquo;</strong>{" "}
                  &mdash; as in &ldquo;bits in a byte,&rdquo; a nod to the fundamental
                  building blocks of digital data. But that name was already taken.
                </p>
              </div>

              <div className="rounded-xl border bg-muted/30 p-5">
                <p className="text-sm text-muted-foreground">
                  So we went with{" "}
                  <strong className="text-foreground">&ldquo;bitesinbyte&rdquo;</strong>{" "}
                  instead &mdash; small, useful <em>bites</em> of software packed into
                  every <em>byte</em>.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  What started as a workaround turned into a name that perfectly
                  captures what we do: building compact, impactful tools, one bite
                  at a time.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
