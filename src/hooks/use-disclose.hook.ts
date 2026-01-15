import { useState, useCallback } from "react";

interface UseDiscloseReturn {
  isOpen: boolean;
  period: string;
  year: number;
  month: number;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  handlePeriod: (str: string) => void;
  handleYear: (num: number) => void;
  handleMonth: (num: number) => void;
}

export const useDisclose = (): UseDiscloseReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState("weekly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handlePeriod = useCallback((str: string) => {
    setPeriod(str);
  }, []);

  const handleYear = useCallback((num: number) => {
    setYear(num);
  }, []);

  const handleMonth = useCallback((num: number) => {
    setMonth(num);
  }, []);

  return {
    isOpen,
    period,
    year,
    month,
    onOpen,
    onClose,
    onToggle,
    handlePeriod,
    handleYear,
    handleMonth,
  };
};
