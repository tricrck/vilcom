interface FeatureBoxProps {
  icon: string;
  title: string;
  desc: string;
  iconBg: string;
  label: string | null;
}

const ROW1: FeatureBoxProps[] = [
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-speed-100.png', title: 'High Speed', desc: 'Enjoy our high speeds of Vilcom fiber for your office meetings and entertainment purposes', iconBg: '#4169ED', label: null },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-money-80.png', title: 'Affordability', desc: 'With us you get more for less. We do Installations free of charge. We have no cappings on your usage.', iconBg: '#FF901D', label: 'Exclusive' },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-online-support-67.png', title: 'Customer Service', desc: 'We provide 24/7 Customer support. Reach out to us at any time of the day for any inquiries', iconBg: '#4169ED', label: null },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-reliability-68.png', title: 'Reliability', desc: 'With our internet plans you get connected to internet that works 24/7 with zero downtime.', iconBg: '#FF901D', label: null },
];

const ROW2: FeatureBoxProps[] = [
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-access-80.png', title: 'Unlimited Access', desc: 'Browse and stream your favourite movies without internet limit restrictions.', iconBg: '#FF901D', label: null },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-cyber-security-100.png', title: 'Security', desc: 'Your privacy and security is our core priority and with us you are assured of both.', iconBg: '#4169ED', label: null },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-total-sales-100.png', title: 'Scalability', desc: 'Easily upgrade and expand your services as your business grows without any hassle.', iconBg: '#FF901D', label: null },
  { icon: 'https://vilcom.ke/wp-content/uploads/2024/05/icons8-support-80.png', title: 'Expert Support', desc: 'Benefit from our team of industry experts who provide tailored solutions and proactive support to keep you ahead of the curve.', iconBg: '#4169ED', label: null },
];

function FeatureBox({ icon, title, desc, iconBg, label }: FeatureBoxProps) {
  return (
    <div
      style={{
        flex: '1 1 calc(25% - 24px)',
        minWidth: 220,
        padding: '45px 30px',
        borderRadius: 10,
        position: 'relative',
        background: '#FFFFFF',
      }}
    >
      {label && (
        <span style={{
          position: 'absolute', top: 0, right: 0,
          background: '#FF901D', color: '#fff',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
          padding: '4px 10px', borderRadius: '0 10px 0 10px',
        }}>
          {label}
        </span>
      )}
      <div style={{
        width: 55, height: 55, borderRadius: '50%',
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 25,
        boxShadow: iconBg === '#4169ED'
          ? '6px 15px 30px 0px rgba(103,200,216,0.23)'
          : '6px 15px 30px 0px rgba(188,0,50,0.12)',
      }}>
        <img src={icon} alt={title} style={{ width: 27, height: 27, objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 600, color: '#233D62', marginBottom: '0.75em' }}>
        {title}
      </h3>
      <div style={{ fontSize: 14, color: '#485666', lineHeight: 1.6, marginBottom: '2.5em' }}>
        {desc}
      </div>
    </div>
  );
}

const WhyChooseUs = () => {
  return (
    <section style={{ padding: '30px 0 50px' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 30, padding: '0 25%' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 41, fontWeight: 600, color: '#233D62', marginBottom: '0.5em' }}>
            Our Features
          </h2>
          <p style={{ fontSize: 20, lineHeight: '34px', color: '#485666' }}>
            Discover the unbeatable features that set us apart and power your success.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          {ROW1.map((f, i) => <FeatureBox key={i} {...f} />)}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 60 }}>
          {ROW2.map((f, i) => <FeatureBox key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
