import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

function AddNewCourseDialog({ children }) {

    const [formData,setFormData]=useState({
      name:'',
      description:'',
      noOfChapter:0,
      includeVideo:false,
      category:'',
      level:''
    });

    const onHandleInputChange=(feild,value)=>{
        setFormData({
            ...formData,
            [feild]: value
        });
        console.log(formData);
    } 

    const onGenerate=()=>{
      console.log(formData);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label>Course Name</label>
                <Input type="text" placeholder="Course Name" onChange={(event)=>onHandleInputChange('name',event?.target.value)} />
              </div>
              <div>
                <label>Course Description (optional)</label>
                <Textarea placeholder="Course Description" onChange={(event)=>onHandleInputChange('description',event?.target.value)} />
              </div>
              <div>
                <label>No. of Chapters</label>
                <Input type="number" placeholder="Number of Chapters" onChange={(event)=>onHandleInputChange('noOfChapters',event?.target.value)} />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                onCheckedChange={()=>onHandleInputChange('includeVideo',!formData?.includeVideo)}
                />
              </div>
              <div>
                <label className="mb-2" >Difficulty level</label>
                <Select onValueChange={(value)=>onHandleInputChange('level',value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input placeholder="Category (Seperated By Comma)"  onChange={(event)=>onHandleInputChange('category',event?.target.value)} />
              </div>
              <div>
                <Button className={'w-full'} onClick={onGenerate} > <Sparkle/>Generate Course</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
