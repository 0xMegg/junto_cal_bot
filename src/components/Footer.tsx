interface FooterProps {
  userName: string;
}

const Footer: React.FC<FooterProps> = ({ userName }) => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto text-center">
        {userName ? (
          <p className="text-gray-600">{userName}님 환영합니다!</p>
        ) : (
          <p className="text-gray-600">채팅창에서 이름을 입력해주세요.</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
