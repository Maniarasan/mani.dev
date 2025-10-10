import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
const FeatureList = [
  {
    title: "👨‍💼 About Me",
    description: (
      <>
        Associate Manager 8+ years of experience driving innovation in AI, web
        technologies, and cloud architecture. Based in Chennai, India, I
        specialize in building scalable solutions that bridge cutting-edge
        technology with practical business value.
        <br />
        <br />
        <Link className="button button--secondary button--sm" to="/about">
          Learn More About Me →
        </Link>
      </>
    ),
  },
  {
    title: "🚀 Tech Stack & Expertise",
    description: (
      <>
        <strong>AI & Machine Learning:</strong> Vector databases, RAG systems,
        LLM integration, AI-driven solutions
        <br />
        <br />
        <strong>Web Technologies:</strong> React, Node.js, TypeScript, modern
        frontend frameworks, API design
        <br />
        <br />
        <strong>Cloud & Architecture:</strong> AWS, Azure, microservices,
        scalable distributed systems, DevOps practices
      </>
    ),
  },
  {
    title: "💼 Projects & Portfolio",
    description: (
      <>
        I work on diverse projects spanning enterprise applications, AI-powered
        tools, and developer productivity solutions. My focus is on creating
        maintainable, scalable systems that solve real-world problems.
        <br />
        <br />
        Key Areas: Enterprise software, AI/ML applications, developer tooling,
        cloud-native architectures, technical leadership
        <br />
        <br />
        <Link
          className="button button--secondary button--sm"
          to="/docs/ai/ai-trends-2025"
        >
          Explore Documentation →
        </Link>
      </>
    ),
  },
];
function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
