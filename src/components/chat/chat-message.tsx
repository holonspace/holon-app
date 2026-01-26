import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cjk } from "@streamdown/cjk"
import { code } from "@streamdown/code"
import { math } from "@streamdown/math"
import { mermaid } from "@streamdown/mermaid"
import { ChevronDown, ChevronUp, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Streamdown } from "streamdown"
// import "katex/dist/katex.min.css"

interface ChatMessageProps {
    role: 'human' | 'ai' | 'system'
    content: string
}

const messageComponents = {
    human: ChatHumanMessage,
    ai: ChatAIMessage,
    system: ChatSystemMessage
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const MessageComponent = messageComponents[role]
    return (
        <MessageComponent content={content} />
    )
}

interface ChatItemMessageProps {
    content: string
}


function ChatHumanMessage({ content }: ChatItemMessageProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = contentRef.current
        if (el) {
            setIsOverflowing(el.scrollHeight > el.clientHeight)
        }
    }, [content])

    const handleOpen = () => setIsOpen(!isOpen)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start justify-end gap-2">
                {isOverflowing && (
                    <Button variant="ghost" size="icon" onClick={handleOpen}>
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                        <span className="sr-only">Toggle details</span>
                    </Button>
                )}
                <Card className="w-[70%] relative">
                    <div className="absolute top-0 right-0 size-3 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)] " />
                    <CardContent className="text-base text-foreground/80 font-normal">
                        <div
                            ref={contentRef}
                            className={cn(
                                "transition-all duration-200",
                                !isOpen && "line-clamp-3"
                            )}
                        >
                            {content}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex items-start justify-end gap-2">
                <CopyButton content={content} />
            </div>
        </div>
    )
}


function ChatAIMessage({ content }: ChatItemMessageProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                <Streamdown
                    caret="block"
                    isAnimating={true}
                    plugins={{
                        code: code,
                        mermaid: mermaid,
                        math: math,
                        cjk: cjk,
                    }}
                    components={{
                        pre: (props) => <pre {...props} className="scrollbar-thin!" />,
                    }}
                >
                    {content}
                </Streamdown>
            </div>
            <div className="flex items-center justify-end gap-2">
                <CopyButton content={content} />
            </div>
        </div>
    )
}

function ChatSystemMessage({ content }: ChatItemMessageProps) {
    return (
        <div>
            {content}
        </div>
    )
}

function CopyButton({ content }: { content: string }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(content)
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy />
            <span className="sr-only">Copy</span>
        </Button>
    )
}
