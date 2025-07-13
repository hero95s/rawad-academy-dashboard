import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  verificationCode: string;
  onConfirm: () => void;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  sectionName,
  verificationCode,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  const handleConfirm = () => {
    if (enteredCode === verificationCode) {
      onConfirm();
      handleClose();
      toast({
        title: 'تم الحذف بنجاح',
        description: `تم حذف بيانات ${sectionName} بنجاح`,
      });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        toast({
          title: 'تم تجاوز الحد الأقصى للمحاولات',
          description: 'تم إغلاق النافذة لأسباب أمنية',
          variant: 'destructive',
        });
        handleClose();
      } else {
        toast({
          title: 'رمز التحقق غير صحيح',
          description: `المحاولة ${newAttempts} من ${maxAttempts}`,
          variant: 'destructive',
        });
      }
      setEnteredCode('');
    }
  };

  const handleClose = () => {
    setEnteredCode('');
    setAttempts(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            تأكيد حذف بيانات {sectionName}
          </DialogTitle>
          <DialogDescription className="text-right">
            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بيانات {sectionName} نهائياً.
            يرجى إدخال رمز التحقق للمتابعة.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">
                <p className="font-medium">تحذير!</p>
                <p>سيتم حذف جميع البيانات المتعلقة بـ {sectionName} بشكل نهائي ولا يمكن استرجاعها.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              رمز التحقق
            </Label>
            <Input
              id="verification-code"
              type="password"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="أدخل رمز التحقق"
              className="text-center"
              maxLength={10}
            />
            {attempts > 0 && (
              <p className="text-sm text-red-600">
                المحاولة {attempts} من {maxAttempts}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            إلغاء
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!enteredCode.trim()}
          >
            تأكيد الحذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};