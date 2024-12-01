import "../styles/Register.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const form = e.target;
    const nombre = form.nombre.value;
    const usuario = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Registro en Supabase Auth
      let { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      const userId = data.user.id;

      // Insertar usuario en la tabla "Users"
      const { dataIns, errorIns } = await supabase
        .from("Users")
        .insert([
          {
            nombre,
            usuario,
            email,
            password,
            userId,
          },
        ])
        .select();

      // Redirigir a la página de inicio
      navigate("/login");
    } catch (err) {
      console.error("Error durante el registro:", err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <div className="register-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h1>Registro</h1>
          </div>
          <p>¡Crea una cuenta para disfrutar de WhatsApp+!</p>
        </div>
        <form id="formularioRegister" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Introduce tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Introduce tu usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Introduce tu contraseña"
            />
          </div>
          <button id="botonReg" type="submit">
            Registrarse
          </button>
        </form>
        <div className="login-link">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
