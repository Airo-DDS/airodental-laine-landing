"use client"

import type { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AudioTranscriptModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AudioTranscriptModal: FC<AudioTranscriptModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Patient Urgent Scheduling</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="transcript" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          {/* Transcript Tab */}
          <TabsContent value="transcript" className="mt-4">
            <div className="max-h-[60vh] overflow-y-auto bg-gray-50 p-4 rounded-md">
              <div className="space-y-4">
                <p><strong>AI</strong>: Hello. This is Lane from Royal Oak Family Dental. How can I assist you today?</p>
                <p><strong>User</strong>: Hi, Lane. Yeah. I just moved to the area. I&apos;ve had a toothache that I&apos;ve been meaning to get taken care of. Since I just moved, I figured that&apos;s a good opportunity to get established somewhere.</p>
                <p><strong>AI</strong>: Thank you for sharing that. I&apos;m glad you called. We&apos;d be happy to help with your toothache and get you set up here. Would you like to schedule an emergency dental visit? Or perhaps a checkup and X rays to start?</p>
                <p><strong>User</strong>: Yeah. That&apos;s probably what I need to do. Right?</p>
                <p><strong>AI</strong>: Absolutely. A checkup and X rays is a is a great way to start. Let me get some details so I can find a time for you. Can I have your full first and last name, please?</p>
                <p><strong>User</strong>: Yep. Sure. It&apos;s Deren Flesher.</p>
                <p><strong>AI</strong>: Thanks, Deren. Can you spell that for me? Just to make sure I get it exactly right.</p>
                <p><strong>User</strong>: Yep. It&apos;s d e r e n f l e s h e r.</p>
                <p><strong>AI</strong>: Got it. And what&apos;s the best contact phone number for you?</p>
                <p><strong>User</strong>: Sure. It&apos;s 4 0 5 8 0 8 1 2 3 4.</p>
                <p><strong>AI</strong>: Thank you. Let me double check. Your phone number is 4 0 5 8 0 8 1 2 3 4. Right?</p>
                <p><strong>User</strong>: Yes. That&apos;s correct.</p>
                <p><strong>AI</strong>: Great. Will you be using dental insurance for this visit?</p>
                <p><strong>User</strong>: I will. Yep.</p>
                <p><strong>AI</strong>: Thanks for sharing that. Can you tell me the name of your insurance company?</p>
                <p><strong>User</strong>: Yeah. I think it&apos;s Aetna.</p>
                <p><strong>AI</strong>: Thanks, Deren. Can you please spell that for me? Just to make sure I get it</p>
                <p><strong>User</strong>: Aetna. Yeah. It&apos;s a e t n a.</p>
                <p><strong>AI</strong>: Perfect. And do you know the subscribers full name and date of birth?</p>
                <p><strong>User</strong>: Yeah. I&apos;m the subscriber. So it&apos;s still Deren Flesher, and it&apos;s 3 1 85.</p>
                <p><strong>AI</strong>: Thanks for that. Just to confirm, your full name is Deren Fleisher and your birth date is March 30 first 19 85. Correct?</p>
                <p><strong>User</strong>: Close. It&apos;s 3 1 85.</p>
                <p><strong>AI</strong>: Got it. Thanks for clarifying. Now, would you prefer a morning or afternoon appointment? We have openings on Thursday or Friday. Do either of those days work for you?</p>
                <p><strong>User</strong>: Yeah. Thursday is good.</p>
                <p><strong>AI</strong>: Great. We have availability on Thursday. Would you prefer the morning around 8 30? Or the late morning at 11?</p>
                <p><strong>User</strong>: Okay. Do that earlier time, the 8 30.</p>
                <p><strong>AI</strong>: Perfect. I&apos;ll go ahead and book you for Thursday at 8 30 in the morning. I&apos;ll also send you a confirmation email and a reminder Can I get your email address?</p>
                <p><strong>User</strong>: Yeah. It&apos;s just my first and last name together at g mail.</p>
                <p><strong>AI</strong>: Thanks, Deren. Just to make sure I have it right, is it daren plescher at gmail dot com?</p>
                <p><strong>User</strong>: Yep.</p>
                <p><strong>AI</strong>: Great. You&apos;re all set for Thursday at 8 30 in the morning. We&apos;ll verify your insurance. Ahead of time, and please arrive about 5 to 10 minutes early. Our address is</p>
                <p><strong>User</strong>: Okay. Oh, sorry. Go ahead. What was your address?</p>
                <p><strong>AI</strong>: No problem. Our address is 71 0 1 Northwest 100 and fiftieth Street at the corner of 100 fiftieth and Rockwell. If you have any other questions before your visit, just give us a call. We&apos;re looking forward to seeing you, Deren.</p>
                <p><strong>User</strong>: Okay. Thanks so much, Lane. I appreciate it. See you guys on Thursday.</p>
                <p><strong>AI</strong>: You&apos;re very welcome. We&apos;re glad to help. See you Thursday at 8 30. Have a great day, Deren.</p>
                <p><strong>User</strong>: Alright. Thanks. Bye bye.</p>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Summary Tab */}
          <TabsContent value="ai-summary" className="mt-4">
            <div className="bg-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium mb-4">AI Summary</h3>
              <p className="text-gray-700 leading-relaxed">
                Deren Flesher, a new resident with a toothache, called Royal Oak Family Dental to establish care. He scheduled a checkup with X-rays for Thursday at 8:30 AM, provided his contact information and Aetna insurance details, and confirmed the office location at 7101 NW 150th Street.
              </p>
            </div>
          </TabsContent>
          
          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-4">
            <div className="bg-gray-50 p-4 rounded-md max-h-[60vh] overflow-y-auto">
              <div className="grid gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium mb-2">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Name:</span> Deren Flesher</div>
                    <div><span className="text-gray-500">Phone:</span> 405‑808‑1234</div>
                    <div><span className="text-gray-500">Email:</span> darenplescher@gmail.com</div>
                    <div><span className="text-gray-500">Insurance:</span> Aetna</div>
                    <div><span className="text-gray-500">Subscriber:</span> Deren Flesher</div>
                    <div><span className="text-gray-500">DOB:</span> 3‑1‑85</div>
                    <div><span className="text-gray-500">Appointment:</span> Thursday, 08:30</div>
                    <div><span className="text-gray-500">Type:</span> Comprehensive exam & X‑rays</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Action Items</h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Enter new patient in practice‑management software",
                        owner: "Front Desk",
                        status: "pending",
                        notes: "Use details above; verify spelling of email and last name on entry."
                      },
                      {
                        id: 2,
                        title: "Clarify date of birth format",
                        owner: "Front Desk",
                        status: "pending",
                        notes: "Patient said &apos;3 1 85&apos;; confirm whether that is 03‑01‑1985 or 03‑31‑1985."
                      },
                      {
                        id: 3,
                        title: "Verify Aetna coverage & benefits",
                        owner: "Insurance Coordinator",
                        status: "pending",
                        notes: "Confirm eligibility, deductible, and co‑pay for new‑patient exam and diagnostic X‑rays."
                      },
                      {
                        id: 4,
                        title: "Block appointment slot in schedule",
                        owner: "Scheduler",
                        status: "pending",
                        notes: "Thursday, 08:30 AM — mark as &apos;new patient / toothache.&apos;"
                      },
                      {
                        id: 5,
                        title: "Send confirmation email with forms & directions",
                        owner: "Front Desk",
                        status: "pending",
                        notes: "Include address: 7101 NW 150th St. Attach new‑patient paperwork or online link; ask patient to arrive 5–10 min early."
                      },
                      {
                        id: 6,
                        title: "Schedule SMS reminder 24 h before visit",
                        owner: "Automated Reminders",
                        status: "pending",
                        notes: "Verify phone number first; message should mention date, time, and location."
                      },
                      {
                        id: 7,
                        title: "Prepare operatory for emergency exam",
                        owner: "Clinical Assistant",
                        status: "pending",
                        notes: "Ensure X‑ray sensors, exam setup, and emergency tray are ready for toothache evaluation."
                      },
                      {
                        id: 8,
                        title: "Print / stage new‑patient intake forms",
                        owner: "Front Desk",
                        status: "pending",
                        notes: "Have paperwork and privacy notices ready if patient cannot complete online."
                      },
                      {
                        id: 9,
                        title: "Update team briefing log",
                        owner: "Office Manager",
                        status: "pending",
                        notes: "Add Deren Flesher to daily huddle list for Thursday; highlight toothache chief complaint."
                      }
                    ].map((task) => (
                      <div key={task.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">{task.title}</span>
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {task.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Owner: {task.owner}</div>
                        <div className="text-sm mt-2">{task.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AudioTranscriptModal 