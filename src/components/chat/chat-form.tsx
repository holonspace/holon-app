import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import {
    ArrowUpIcon,
    BookOpenIcon,
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
import { useState } from "react"


export function ChatForm() {
    const [dictateEnabled, setDictateEnabled] = useState(false)

    return (
        <Field>
            <FieldLabel htmlFor="prompt" className="sr-only">
                Prompt
            </FieldLabel>
            <InputGroup>
                <InputGroupTextarea id="prompt" placeholder="Ask anything" className="textbase md:text-base p-4" />
                <InputGroupAddon align="block-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
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
                    {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <InputGroupButton
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setDictateEnabled(!dictateEnabled)}
                                className="ml-auto rounded-4xl"
                            >
                                <AudioLinesIcon className="size-4" />
                            </InputGroupButton>
                        </TooltipTrigger>
                        <TooltipContent>Dictate</TooltipContent>
                    </Tooltip> */}
                    <InputGroupButton
                        size="icon-sm"
                        variant="default"
                        className="ml-auto rounded-4xl"
                    >
                        <ArrowUpIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}