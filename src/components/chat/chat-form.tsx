import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import {
    ArrowUpIcon,
    BookOpenIcon,
    ChevronsDownUp,
    ChevronsUpDown,
    GlobeIcon,
    MoreHorizontalIcon,
    MousePointerIcon,
    PaperclipIcon,
    PenToolIcon,
    PlusIcon,
    ShareIcon,
    ShoppingBagIcon,
    SparklesIcon,
    WandIcon
} from "lucide-react"
import { useEffect, useRef, useState } from "react"


export function ChatForm() {
    const [dictateEnabled, setDictateEnabled] = useState(false)
    const [content, setContent] = useState("")
    const [isOverflowing, setIsOverflowing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const contentRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const el = contentRef.current
        if (el) {
            setIsOverflowing(el.scrollHeight > el.clientHeight)
        }
    }, [contentRef, content])

    const handleOpen = () => setIsOpen(!isOpen)

    return (
        <Field>
            <FieldLabel htmlFor="prompt" className="sr-only">
                Prompt
            </FieldLabel>
            <InputGroup>
                <InputGroupTextarea
                    id="prompt"
                    placeholder="Ask anything"
                    className={cn("textbase md:text-base my-4 px-4 overflow-y-auto scrollbar-thin transition-all duration-200", isOpen ? "max-h-[60dvh]" : "max-h-[200px]")}
                    ref={contentRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <InputGroupAddon align="block-end" className="flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="secondary"
                                size="icon-sm"
                                onClick={() => setDictateEnabled(!dictateEnabled)}
                                className="rounded-4xl"
                            >
                                <PlusIcon />
                            </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            onCloseAutoFocus={(e) => e.preventDefault()}
                        >
                            <DropdownMenuItem>
                                <PaperclipIcon />
                                Add photos & files
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SparklesIcon />
                                Deep research
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ShoppingBagIcon />
                                Shopping research
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <WandIcon />
                                Create image
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MousePointerIcon />
                                Agent mode
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <MoreHorizontalIcon />
                                    More
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <ShareIcon />
                                        Add sources
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BookOpenIcon />
                                        Study and learn
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <GlobeIcon />
                                        Web search
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <PenToolIcon />
                                        Canvas
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {isOverflowing && (
                        <InputGroupButton
                            size="icon-sm"
                            variant="ghost"
                            className="ml-auto rounded-4xl"
                            onClick={handleOpen}
                        >
                            {isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
                        </InputGroupButton>
                    )}
                    <InputGroupButton
                        size="icon-sm"
                        variant="default"
                        className="rounded-4xl"
                    >
                        <ArrowUpIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}