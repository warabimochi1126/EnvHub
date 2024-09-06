import { QiitaLink } from "../elements/qiita-link";

export function Footer() {
  return (
    <footer className="flex justify-between py-6 px-24 bg-gray-100 text-gray-500 text-sm">
      <div>© 2024 warabimochi All rights reserved.</div>
      <QiitaLink />
    </footer>
  );
}
