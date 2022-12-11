import SideNavLayout from "../components/SideNavLayout";
import dynamic from 'next/dynamic'

const ChatUi = dynamic(() => import('../components/Chat/ChatUi'), {
  ssr: false,
})

const messages = () => {
  return (
    <SideNavLayout>
      <ChatUi />
    </SideNavLayout>
  );
};

export default messages;
