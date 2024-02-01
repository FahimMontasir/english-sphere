"use client";
import { Icon, Image, Modal, Text } from "@/components/common";
import Message from "@/components/user-details/Message";
import NotiList from "@/components/user-details/NotiList";
import UDButton from "@/components/user-details/UDButton";
import { useState } from "react";

export default function Page() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="flex flex-wrap xl:flex-nowrap xl:gap-[80px]">
      <section className="w-full xl:w-[40%]">
        {/* cover */}
        <section className="relative h-[100px]">
          {/* cover photo */}
          <div className="absolute inset-0">
            <Image
              className="h-full w-full"
              src="https://i.pravatar.cc/1000"
              alt="cover photo"
            />
          </div>
          {/* foreground */}
          <div className="relative h-full z-10 flex justify-between items-end">
            <div className="flex flex-col justify-between h-full">
              <Icon
                name="profile-cam"
                className="h-[25px] w-[25px] fill-white-c mt-[10px] ml-[10px] cursor-pointer"
              />
              <div className="flex items-center justify-between p-[5px] w-[140px] h-[30px] rounded-tr-rounded-md bg-[rgb(225,225,225)]/80">
                <Text variant="p">Atel Montasir</Text>
                <Icon
                  name="pen"
                  className="h-[20px] w-[20px] fill-black-c cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Image
                className="h-[100px] w-[100px] rounded-full -mb-[25px] mr-[10px]"
                src="https://i.pravatar.cc/1000"
                alt="avatar"
              />
              <div className="absolute h-[25px] w-[25px] flex justify-center items-center rounded-full bg-bgwhite cursor-pointer">
                <Icon
                  name="profile-cam"
                  className="h-[15px] w-[15px] fill-black-c"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="p-[5px] flex justify-between items-end">
          <div>
            <Text variant="sm">Position: 202</Text>
            <Text variant="sm">Last active: 2m ago...</Text>
          </div>
          <Icon
            name="chat"
            className="h-[30px] w-[30px] -mb-[10px] mr-[10px] cursor-pointer"
          />
        </section>
        {/* skills */}
        <section className="mt-[35px] px-[10px]">
          <div className="flex justify-between items-center">
            <Text variant="h3">Skills</Text>

            <div className="relative flex w-full max-w-[180px] items-center">
              <Icon
                name="add"
                className="absolute right-[10px] h-[15px] w-[15px] cursor-pointer fill-black-c"
              />
              <input
                type="text"
                name="add-skill"
                id="add-skill"
                className="h-[30px] w-full px-[10px] rounded-rounded-md bg-white-c text-black-c outline outline-[1px]"
              />
            </div>
          </div>

          <div className="mt-[20px] flex gap-[10px] justify-center md:gap-[15px] flex-wrap mr-auto:not(:last-child)">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="relative w-[100px] md:w-[120px] h-[20px] bg-white-c rounded-rounded-md flex justify-center items-center"
                >
                  <Text variant="p">React.js</Text>

                  <div className="absolute right-0 top-0 -mt-[10px] -mr-[5px] w-[25px] h-[25px] flex justify-center items-center bg-bgwhite rounded-full cursor-pointer">
                    <Icon name="pen" className="h-[15px] w-[15px]" />
                  </div>
                </div>
              ))}
          </div>
        </section>
        {/* notifications */}
        <section className="mt-[30px] px-[10px]">
          <Text variant="h3">Insta Talk Logs and Notifications</Text>
          <ul className="mt-[10px] flex flex-col gap-[10px]">
            <NotiList insta />
            <NotiList />
          </ul>

          <div className="flex justify-center my-[15px]">
            <UDButton>Load more</UDButton>
          </div>
        </section>
      </section>

      {/* right part */}
      <section>
        {/* ban & notify */}
        <section className="flex flex-wrap gap-[30px]">
          <div>
            <Text variant="h3">Ban for</Text>
            <div className="flex mt-[10px] gap-[5px]">
              <UDButton>5 days</UDButton>
              <UDButton>Forever</UDButton>
            </div>
          </div>
          <div>
            <Text variant="h3">Notify</Text>
            <div className="ml-[20px] mt-[10px] relative flex w-[300px] items-center">
              <Icon
                name="noti-send"
                className="absolute bottom-[5px] right-[5px] h-[20px] w-[20px] cursor-pointer fill-black-c"
              />
              <textarea
                name="add-skill"
                rows={3}
                id="add-skill"
                className="w-full px-[10px] rounded-rounded-md bg-white-c text-black-c outline outline-[1px]"
              />
            </div>
          </div>
        </section>
        {/* ls */}
        <section className="mt-[30px]">
          <Text variant="h3">Live Stream</Text>
          <div className="mt-[10px] flex justify-center">
            <Image
              src="/static/pictures/ls.png"
              alt="ls"
              className="h-[180px] w-[320px]"
            />
          </div>
        </section>
        {/* chat history */}
        <section className="mt-[30px]">
          <Text variant="h3">Chat History</Text>
          <div className="flex justify-center">
            <ul className="mt-[10px] flex gap-[10px] flex-wrap max-w-[360px]">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <NotiList onClick={() => setOpenChat(true)} key={i} message />
                ))}
            </ul>
          </div>
          <div className="flex justify-center my-[15px]">
            <UDButton>Load more</UDButton>
          </div>
        </section>
      </section>
      {/* view chat */}
      <Modal
        className="md:!w-[450px]"
        isOpen={openChat}
        onClose={() => setOpenChat(false)}
      >
        <section className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center">
            <Image
              className="h-[40px] w-[40px] rounded-full"
              src="https://i.pravatar.cc/1000"
              alt="image"
            />
            <Text variant="h3">Wemon Mosk</Text>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[10px] h-[10px] rounded-full bg-success" />
              <Text variant="p">Active now</Text>
            </div>
          </div>
          {/* chat list */}
          <div>
            <div className="flex flex-col gap-[15px] my-[20px]">
              <Message
                timestamps="8h ago"
                message="hi! women musk how are you doing? are you single?"
              />
              <Message replay timestamps="now" message="nope!" />
            </div>

            {/* send text */}
            <div className="my-[10px] px-[5px] relative flex w-full h-[35px] items-center">
              <Icon
                name="noti-send"
                className="absolute bottom-[7px] right-[10px] h-[20px] w-[20px] cursor-pointer fill-black-c"
              />
              <input
                placeholder="Type here..."
                name="add-skill"
                id="add-skill"
                className="w-full p-[10px] rounded-rounded-md bg-white-c text-black-c outline outline-[1px]"
              />
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}
