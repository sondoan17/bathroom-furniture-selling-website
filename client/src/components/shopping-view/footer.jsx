import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="contact-info">
            <h3 className="text-lg font-semibold mb-4">Liên lạc với chúng tôi</h3>
            <p className="mb-2"><strong>Địa chỉ:</strong> 142 Nguyễn Chính, Thịnh Liệt, Hoàng Mai, Hà Nội</p>
            <p className="mb-2"><strong>Số điện thoại:</strong> 0345366789</p>
       
            <p className="mb-2"><strong>Giờ làm việc:</strong> 9:00 - 18:00</p>
          </div>
          <div className="google-map">
            <h3 className="text-lg font-semibold mb-4">Bản đồ</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d276.8885176895938!2d105.84816018704315!3d20.978482782586262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6d9d0c8257%3A0x775832da8759648a!2zMTQyIFAuIE5ndXnhu4VuIENow61uaCwgVGjhu4tuaCBMaeG7h3QsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1726689616507!5m2!1svi!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2024 Shop Bảo Minh
        </div>
      </div>
    </footer>
  );
};

export default Footer;