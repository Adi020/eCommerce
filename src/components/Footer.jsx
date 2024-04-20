const Footer = () => {
  return (
    <footer className="bg-gray-700 flex justify-center">
      <section className="flex flex-wrap justify-center max-w-[1280px] items-center gap-7 h-[200px] p-5 text-white">
        <span className="w-full text-center">&copy; Copyright Fabio 2024</span>
        <a
          href="https://www.linkedin.com/in/fabio-camacho-a41b17281"
          target="_blank"
          className="rounded-full overflow-hidden p-3 aspect-square flex items-center justify-center bg-slate-600"
        >
          <i className="bx bxl-linkedin text-3xl"></i>
        </a>
        <a
          href="https://github.com/Adi020"
          target="_blank"
          className="rounded-full overflow-hidden p-3 aspect-square flex items-center justify-center bg-slate-600"
        >
          <i className="bx bxl-github text-3xl rounded-full overflow-hidden"></i>
        </a>
        <a
          href="mailto:adrian.camacho.zotelo@gmail.com"
          target="_blank"
          className="rounded-full overflow-hidden p-3 aspect-square flex items-center justify-center bg-slate-600"
        >
          <i className="bx bx-envelope text-3xl rounded-full overflow-hidden"></i>
        </a>
      </section>
    </footer>
  );
};
export default Footer;
