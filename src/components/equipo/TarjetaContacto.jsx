function TarjetaContacto({ nombre, email, puesto, foto }) {

  return (
    <div className="text-center card-box shadow-sm p-4 mb-4 bg-white rounded-5">
      <div className="member-card">
        <div className="thumb-lg mx-auto mb-3">
          <img
            src={foto}
            className="rounded-circle img-thumbnail"
            alt={nombre}
          />
        </div>
        <div className="mt-3">
          <h4>{nombre}</h4>
          <p className="text-muted">
            @{puesto} <span>| </span>
            <span>
              <a href={`mailto:${email}`} className="text-pink">{email}</a>
            </span>
          </p>
        </div>
      </div>
    </div>


  );
}

export default TarjetaContacto;