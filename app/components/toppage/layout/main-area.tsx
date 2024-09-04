import { MainAreaButton } from "../elements/main-area-button";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { DisclaimerButton } from "../elements/disclaimer-button";

export function MainArea() {
  return (
    <div className="py-28">
      <div className="container mx-auto text-center">
        <h1 className="text-7xl font-bold">EnvHub</h1>
        <p className="text-gray-500 mt-3 text-xl">
          EnvHubは.envファイルをGitHubリポジトリに紐づけて保存・共有出来るWebアプリケーションです。
        </p>

        <div className="flex justify-center space-x-12 mt-6">
          <MainAreaButton
            href={`${process.env.SITE_DOMAIN}/share/post`}
            theme="blue"
            Icon={FiUpload}
            text="Share.env"
          />
          <MainAreaButton
            href={`${process.env.SITE_DOMAIN}/share/get`}
            theme="gray"
            Icon={FiDownload}
            text="Get.env"
          />
          <DisclaimerButton />
        </div>
      </div>
    </div>
  );
}
