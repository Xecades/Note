import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale_zhcn from "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.locale(locale_zhcn);

export default dayjs;
