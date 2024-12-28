"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FolderTree, CheckCircle, AlertCircle } from 'lucide-react'

export default function BookmarkManager() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { title: "上传书签", icon: Upload },
    { title: "清理和去重", icon: CheckCircle },
    { title: "AI分类", icon: FolderTree },
    { title: "最终确认", icon: AlertCircle }
  ];

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep(prevStep => prevStep + 1);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">AI 书签管理器</h1>
      
      <div className="mb-8 flex justify-between">
        {steps.map((s, index) => (
          <Card key={index} className={`w-1/5 ${step === index ? 'border-blue-500' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {s.title}
              </CardTitle>
              <s.icon className={`size-4 ${step > index ? 'text-green-500' : 'text-gray-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{index + 1}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {step === 0 && (
        <div className="text-center">
          <Button onClick={() => { setStep(1); simulateProgress(); }}>
            上传书签文件
          </Button>
        </div>
      )}

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>清理和去重进度</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="mt-2">处理中：删除无效链接，合并重复项</p>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>AI 分类建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg bg-gray-100 p-4">
              这里将显示分类树状图
            </div>
            <Button onClick={() => { setStep(3); }}>确认分类</Button>
            <Button variant="outline" className="ml-2">编辑分类</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>最终确认</CardTitle>
          </CardHeader>
          <CardContent>
            <p>所有书签已整理完毕，请确认以下内容：</p>
            <ul className="mt-2 list-inside list-disc">
              <li>总计处理书签数：1234</li>
              <li>删除无效链接：56</li>
              <li>合并重复项：78</li>
              <li>新建文件夹数：15</li>
            </ul>
            <Button className="mt-4" onClick={() => alert('书签整理完成！')}>
              完成并导出
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}