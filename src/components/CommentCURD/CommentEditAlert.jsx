"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
const CommentEditAlert = ({ cid, currentText = "" }) => {
  const CEID = cid;
  const [commentText, setCommentText] = useState(currentText);
  const [isLoading, setIsLoading] = useState(false);
  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${CEID}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ comment: commentText }),
        }
      );
      if (res.ok) {
        toast.success("Comment edited successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Failed to edit comment!");
      }
    } catch (error) {
      toast.error("An error occurred while editing comment!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal>
      <Button
        className="p-0 text-[11px] font-semibold text-cyan-500 hover:text-cyan-400 hover:underline transition-all cursor-pointer"
        variant="flat"
      >
        Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-[var(--background)]">
            <form onSubmit={handleEdit} className="w-full flex flex-col">
              <Modal.CloseTrigger />
              <Modal.Header>
                <p className="text-lg font-semibold">Edit Your Comment</p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <TextField
                  className="w-full"
                  name="comment"
                  variant="secondary"
                  value={commentText}
                  onChange={(val) => setCommentText(typeof val === 'string' ? val : val?.target?.value || "")}
                >
                  <Label className="mb-2 text-sm text-gray-300">Enter Your New Comment</Label>
                  <Input placeholder="Enter your Comment" className="w-full" />
                </TextField>
              </Modal.Body>
              <Modal.Footer className="flex justify-end gap-3 pt-2">
                <Button slot="close" variant="flat" className="px-4">Cancel</Button>
                <Button type="submit" isLoading={isLoading} variant="solid" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4">
                  Update Comment
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
export default CommentEditAlert;