
export const getArrayChannels = ({ channels: { allIds, byId } }) => allIds.map((id) => byId[id]);
export const getArrayMessages = (channelId) => ({ messages: { allIds, byId } }) => allIds
  .filter((id) => byId[id].channelId === channelId)
  .map((id) => byId[id]);
export const getCurrentChannelId = ({ channels }) => channels.currentChannelId;
export const modalType = (state) => state.modals.modalType;
export const modalProps = (state) => state.modals.modalProps;
export const messages = (state) => state.messages;
export const channels = (state) => state.channels;
