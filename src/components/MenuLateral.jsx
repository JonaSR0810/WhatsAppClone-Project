import { createClient } from "@supabase/supabase-js";
import { useState,useEffect } from "react";
import "https://kit.fontawesome.com/23a2b9705b.js";
import "../styles/whatsapp.css";
import Avatar from '@mui/material/Avatar';

import { useNavigate } from "react-router-dom";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/* eslint-disable react/prop-types */
function MenuLateral() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [imageUser, setImageUser] = useState("")

  function abrirMenuFoto(){
    const menu = document.getElementById('dropdownMenu');

    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'flex';
    }

  }

  function abrirMenuAjustes(){
    const menu = document.getElementById('dropdownMenuAjustes');

    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'flex';
    }

  }

  async function cambiarImagenPerfil(){
  const userId = sessionStorage.getItem("userId")

    let { data: Users, error } = await supabase
    .from('Users')
    .select('image')
    .eq('userId', userId)

    if(error){
      console.log("Error al sacar la imagen:" + error)
    }else{
      console.log(Users)
      
    }
  }

  function cerrarSesion(){

    sessionStorage.clear()
    navigate("/login")
    

  }

  const userId = sessionStorage.getItem("userId")
  useEffect(() => {
    if (userId) {
      // Llamada para obtener el nombre
      async function sacarNombre() {
        let { data: Users, error } = await supabase
          .from("Users")
          .select("*")
          .eq("userId", userId);

        if (error) {
          console.log("Error al sacar el usuario: " + error);
        } else {
          setUsername(Users[0]?.nombre);
        }
      }

      // Llamada para obtener la imagen
      async function sacarImagen() {
        let { data: Users, error } = await supabase
          .from("Users")
          .select("*")
          .eq("userId", userId);

        if (error) {
          console.log("Error al sacar el usuario: " + error);
        } else {
          const userImage = Users[0]?.image;
          if (userImage) {
            setImageUser(userImage);
          } else {
            setImageUser(Users[0]?.nombre.charAt(0).toUpperCase());
          }
        }
      }

      // Llamar a las funciones para obtener los datos del usuario
      sacarNombre();
      sacarImagen();
    }
  }, [userId]);


  return (
    <>
    <nav className="menuCompleto">
        <i className="fa-solid iconosLat fa-bars menu" style={{color: "#ffffff"}}></i>
        <div className="menu1">
        <i className="fa-solid iconosLat fa-comment-dots selected" style={{color: "#ffffff"}}></i>
        <i className="fa-solid iconosLat fa-phone" style={{color: "#ffffff"}}></i>
        <i className="fa-solid iconosLat fa-hurricane" style={{color: "#ffffff"}}></i>
        </div>

        <div className="menuMedio"></div>


        <div className="menu2">
        <i className="fa-regular iconosLat fa-star" style={{color: "#ffffff"}}></i>
        <i className="fa-solid iconosLat fa-box-archive" style={{color: "#ffffff"}}></i>
        </div>

        <hr></hr>

        <div className="menu3">
        <i className="fa-solid iconosLat fa-gear" style={{color: "#ffffff"}} onClick={() =>abrirMenuAjustes()}></i>

        <div className="dropdownMenuAjustes" id="dropdownMenuAjustes">
        <div className="perfilInfo">
          <button onClick={() => cambiarImagenPerfil()}>Cambiar Imagen</button>
          
        </div>
          
      </div>
        {imageUser.includes("http") ? (
              <img
                src={imageUser}
                alt="Foto de perfil"
                className="fotoChicaPerfil"
                onClick={()=> abrirMenuFoto()}
              />
            ) : (
              <Avatar className="fotoChicaPerfil" onClick={()=> abrirMenuFoto()}>{imageUser}</Avatar>
            )}
        
        </div>
       
        </nav>
        <nav className="menuCerrarSesion">
        
        <div className="dropdownMenu" id="dropdownMenu">
        
          <div className="perfilInfo">
            
          {imageUser.includes("http") ? (
              <img
                src={imageUser}
                alt="Foto de perfil"
                className="fotoPerfilGrande"
              />
            ) : (
              <Avatar className="fotoPerfilGrande">{imageUser}</Avatar>
            )}
            <div className="nombreUsuario">{username}</div>
          </div>
            <button id="logout" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </nav>
    </>
    
  );
}

export default MenuLateral;
