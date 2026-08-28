export interface EmpresaData {
  nombre: string;
  ruc: string;
  direccionCompleta: string;
  direccionCorta: string;
  telefono: string;
  telefonoWhatsApp: string;
  email: string;
}

export const empresa: EmpresaData = {
  nombre: "Beyritech Modular Systems S.A.C.",
  ruc: "",
  direccionCompleta: "Av. Santa Elvira Mza. B Lote 8, Los Olivos, Lima, Perú",
  direccionCorta: "Av. Santa Elvira Mza. B Lote 8, Los Olivos, Lima",
  telefono: "+51 993 694 677",
  telefonoWhatsApp: "51993694677",
  email: "asistente.comercial@beyritech.com",
};

export const whatsappLink = (mensaje: string) =>
  `https://wa.me/${empresa.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;