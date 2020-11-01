import Cookies from 'js-cookie';
import faker from 'faker';
import _ from 'lodash';

const isFirstEntry = !_.isUndefined(Cookies.get('nickName'));
if (!isFirstEntry) {
  const randomNick = faker.name.findName();
  const randomAvatar = faker.image.avatar();
  Cookies.set('nickName', randomNick);
  Cookies.set('avatar', randomAvatar);
}
const nickName = Cookies.get('nickName');
const avatar = Cookies.get('avatar');

export default { nickName, avatar };
