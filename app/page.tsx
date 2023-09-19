import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Empower Your Imagination:
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">Inspiring AI Prompts</span>
    </h1>
    <p className="desc text-center">Prompt creation and sharing platform</p>

    <Feed />
  </section>
);

export default Home;
