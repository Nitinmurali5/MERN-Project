import "../styles/about.css";

const About = () => {
  return (
    <div className="about-wrapper">
      
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About E-Kart</h1>
        <p>
          A modern e-commerce platform built to deliver a seamless, secure, and
          intuitive shopping experience.
        </p>
      </section>

      {/* Content Sections */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to build an e-commerce solution that combines modern web
          technologies with intuitive design. We aim to make online shopping
          simple, fast, and accessible for everyone.
        </p>
      </section>

      <section className="about-section card">
        <h2>What We Offer</h2>
        <ul>
          <li>Clean and responsive user interface</li>
          <li>Secure authentication system</li>
          <li>Organized product browsing</li>
          <li>Scalable and maintainable architecture</li>
          <li>Modern UI inspired by real-world platforms</li>
        </ul>
      </section>

      <section className="about-section card">
        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Backend:</strong> Node.js & Express.js</li>
          <li><strong>Database:</strong> MongoDB</li>
          <li><strong>Styling:</strong> Modern CSS</li>
        </ul>
      </section>

     

      <section className="about-section card">
        <h2>Future Enhancements</h2>
        <ul>
          <li>Shopping cart and checkout flow</li>
          <li>Advanced product filtering</li>
          <li>User profiles and order history</li>
          <li>Payment gateway integration</li>
          <li>Admin product management dashboard</li>
        </ul>
      </section>

    </div>
  );
};

export default About;
