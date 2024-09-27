import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

// TODO:後で横揃えて大きさ合わせる
export function FileListItem() {
  return (
    <div className="flex">
      <FaFileAlt size={40} />
      <div>
        <p>ここにファイル名が入ります。</p>
        <p>ここにファイルの大きさが入ります。</p>
        <p>ここにファイルのcraeted_atが入ります。</p>
      </div>
      <FaDownload />
    </div>
  );
}
