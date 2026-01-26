import { ChatForm } from "@/components/chat"
import { ChatSidebar } from "@/components/chat/chat-sidebar"


export default function ChatPage() {
    return (
        <ChatSidebar>
            <div className="flex-1 flex flex-col min-h-0 [--chat-content-max-width:768px]">
                {/* 訊息區域 - 可滾動 */}
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto w-(--chat-content-max-width)">
                        {/* 未來放置聊天訊息 */}
                    </div>
                </div>
                {/* 輸入表單 - 固定在底部 */}
                <div className="shrink-0 mx-auto w-(--chat-content-max-width) mb-4">
                    <ChatForm />
                </div>
            </div>
        </ChatSidebar>
    )
}