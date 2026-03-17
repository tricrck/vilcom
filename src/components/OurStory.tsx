const OurStory = () => {
  return (
    <section className="py-16 bg-background">
      <div className="vilcom-section">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-10">
          Our Story
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8mu0nf_347w?modestbranding=1"
              title="Vilcom Networks Story 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/V7ukK1U4NRw?modestbranding=1"
              title="Vilcom Networks Story 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
