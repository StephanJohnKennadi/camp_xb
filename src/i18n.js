import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      cta: {
        title: "Ready to Disconnect and Ignite Your Outdoor Spirit?",
        description: "Drop us a message today. Our expert outdoor coordinators will structure the ultimate custom package layout for your camp, corporate, or sports teams.",
        button: "Inquire Booking Now",
        whatsapp: "Consult on WhatsApp",
        securing: "100% Secure Bookings",
        arrangements: "Custom Food & Travel Arrangements"
      },
      navbar: {
        language: "Language"
      },
      corporate: {
        tag: "Corporate Synergies",
        title: "Recharge Productivity & Cooperation In Nature",
        description: "Break the standard mundane work cycles. Elevate teamwork dynamics with our tailored navigation courses, high-ropes survival challenges, and open-hearth conference facilities. Blending corporate strategy session setups with dynamic wilderness triggers.",
        feature1: "Forest Orienteering Loops",
        feature2: "Timber Boardrooms",
        feature3: "150 Seat Amphitheatre",
        feature4: "Custom Buffet Catering",
        button: "Book Corporate Retreat"
      },
      family: {
        tag: "Family Bonds & Retreats",
        title: "Unplug Devices. Reconnect With Nature.",
        description: "Provide your children with authentic forest memories. Guided astronomy stargazing workshops, organic archery targets, parent-child rope course circuits, and lakeside picnics. Fully secured luxury glamping cabins with full modern restrooms.",
        feature1: "Stargazing Astronomy",
        feature2: "Archery Tournaments",
        feature3: "Safe Lake Water Activities",
        feature4: "Deluxe Air-con Dorms",
        button: "Book Family Picnic"
      }
    }
  },
  es: {
    translation: {
      cta: {
        title: "¿Listo para desconectar y encender tu espíritu al aire libre?",
        description: "Escríbenos hoy mismo. Nuestros coordinadores expertos en actividades al aire libre estructurarán el paquete personalizado definitivo para tu campamento, empresa o equipo deportivo.",
        button: "Reservar Consulta Ahora",
        whatsapp: "Consultar por WhatsApp",
        securing: "Reservas 100% Seguras",
        arrangements: "Comidas y Viajes Personalizados"
      },
      navbar: {
        language: "Idioma"
      },
      corporate: {
        tag: "Sinergias Corporativas",
        title: "Recarga la Productividad y la Cooperación en la Naturaleza",
        description: "Rompe los ciclos de trabajo mundanos estándar. Eleva la dinámica del trabajo en equipo con nuestros cursos de navegación a medida, desafíos de supervivencia en cuerdas altas e instalaciones para conferencias al aire libre. Combinando sesiones de estrategia corporativa con disparadores dinámicos en la naturaleza.",
        feature1: "Rutas de Orientación Forestal",
        feature2: "Salas de Juntas de Madera",
        feature3: "Anfiteatro de 150 Asientos",
        feature4: "Catering de Buffet Personalizado",
        button: "Reservar Retiro Corporativo"
      },
      family: {
        tag: "Vínculos y Retiros Familiares",
        title: "Desconecta Dispositivos. Reconecta con la Naturaleza.",
        description: "Brinda a tus hijos recuerdos auténticos del bosque. Talleres guiados de observación de estrellas, tiro con arco orgánico, circuitos de cuerdas para padres e hijos y picnics junto al lago. Cabañas de glamping de lujo totalmente aseguradas con baños modernos completos.",
        feature1: "Astronomía y Observación de Estrellas",
        feature2: "Torneos de Tiro con Arco",
        feature3: "Actividades Acuáticas Seguras en el Lago",
        feature4: "Dormitorios de Lujo con Aire Acondicionado",
        button: "Reservar Picnic Familiar"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safe from XSS by default
    }
  });

export default i18n;
