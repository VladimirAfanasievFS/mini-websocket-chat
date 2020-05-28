
export const getInputChat2 = (state) => state.inputChat2;
export const getChannels = ({ channels: { allIds, byId } }) => allIds.map((id) => byId[id]);
export const getMessages = (channelId) => ({ messages: { allIds, byId } }) => allIds
  .filter((id) => byId[id].channelId === channelId)
  .map((id) => byId[id]);
export const getCurrentChannelId = ({ channels }) => channels.currentChannelId;
export const modalType = (state) => state.modals.modalType;
export const modalProps = (state) => state.modals.modalProps;
export const getCurrentChannel = ({ channels }) => channels.byId[channels.currentChannelId];
export const messages = (state) => state.messages;
