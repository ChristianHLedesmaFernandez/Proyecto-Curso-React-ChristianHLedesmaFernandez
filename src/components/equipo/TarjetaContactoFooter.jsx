const TarjetaContactoFooter = ({ foto, email, nombre, puesto }) => {
  return (
    <div 
      className="d-flex align-items-center p-2 rounded-3 border border-secondary mb-3 shadow-sm" 
      style={{ 
        backgroundColor: "#1a1a1a", // Un gris casi negro para que resalte el texto blanco
        transition: "transform 0.3s ease",
        height: "70px" // Altura fija para que todas las tarjetas midan lo mismo en el carrusel
      }}
      // Efecto simple de elevación al pasar el mouse
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
    {/*}
    <div className="d-flex align-items-center p-2 rounded-3 border border-secondary mb-3" 
         style={{ backgroundColor: "#b7abab", transition: "0.3s" }}>
    */}
      <img 
        src={foto} 
        alt={nombre}
        className="rounded-circle border border-info"
        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
      />

      <div className="ms-3 text-start">
        <p className="mb-0 fw-bold small text-white" style={{ lineHeight: '1.2' }}>
          {nombre}
        </p>
        <p className="mb-0 text-white-50" style={{ fontSize: '0.7rem' }}>
          @{puesto} <span>| </span>
            <span>
              <a href={`mailto:${email}`} className="text-pink">{email}</a>
            </span>
        </p>
      </div>
    </div>
  );
};

export default TarjetaContactoFooter;