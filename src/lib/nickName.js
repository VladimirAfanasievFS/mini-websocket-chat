import Cookies from 'js-cookie';
import faker from 'faker';
import _ from 'lodash';

const isFirstEntry = !_.isUndefined(Cookies.get('nickName'));
if (!isFirstEntry) {
  const randomNick = faker.name.findName();
  Cookies.set('nickName', randomNick);
}
const nickName = Cookies.get('nickName');

export default nickName;
