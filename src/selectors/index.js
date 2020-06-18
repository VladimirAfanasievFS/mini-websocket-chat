
export const getChannels = ({ channels: { entities } }) => entities;
export const getMessages = (channelId) => ({ messages: { entities } }) => entities
  .filter((entitie) => entitie.channelId === channelId);
export const getCurrentChannelId = ({ channels }) => channels.currentChannelId;
export const modalType = (state) => state.modals.modalType;
export const modalProps = (state) => state.modals.modalProps;
export const messages = (state) => state.messages;
export const channels = (state) => state.channels;
