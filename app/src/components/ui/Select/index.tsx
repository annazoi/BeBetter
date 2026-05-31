import { FC, ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import "./style.css";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  accent?: "primary" | "accent" | "success";
}

interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const MENU_GAP = 8;

const Select: FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const selectedOption = options.find((option) => option.value === value);
  const isVisible = isOpen || isClosing;

  const closeMenu = () => {
    if (!isOpen || isClosing) return;
    setIsOpen(false);
    setIsClosing(true);
  };

  const openMenu = () => {
    setIsClosing(false);
    setIsOpen(true);
    const selectedIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    closeMenu();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isClosing) return;
    const timer = window.setTimeout(() => setIsClosing(false), 220);
    return () => clearTimeout(timer);
  }, [isClosing]);

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 240;
      const viewportPadding = 12;
      const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
      const spaceAbove = rect.top - viewportPadding;
      const openUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;

      setMenuStyle({
        left: rect.left,
        width: rect.width,
        top: openUpward ? rect.top - MENU_GAP : rect.bottom + MENU_GAP,
      });

      if (menuRef.current) {
        menuRef.current.dataset.placement = openUpward ? "top" : "bottom";
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isVisible, options.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      closeMenu();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((current) => (current + 1) % options.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((current) => (current - 1 + options.length) % options.length);
      }

      if (event.key === "Enter" && highlightedIndex >= 0) {
        event.preventDefault();
        selectOption(options[highlightedIndex].value);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isClosing, highlightedIndex, options]);

  const menu = isVisible ? (
    <div
      ref={menuRef}
      id={listboxId}
      role="listbox"
      aria-labelledby={selectId}
      className={`habitry-select-menu ${isOpen && !isClosing ? "habitry-select-menu--open" : ""} ${isClosing ? "habitry-select-menu--closing" : ""}`}
      style={{
        top: menuStyle.top,
        left: menuStyle.left,
        width: menuStyle.width,
      }}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isHighlighted = index === highlightedIndex;

        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={`habitry-select-option ${isSelected ? "habitry-select-option--selected" : ""} ${isHighlighted ? "habitry-select-option--highlighted" : ""}`}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={() => selectOption(option.value)}
          >
            {option.icon && (
              <span className={`habitry-select-option__icon habitry-select-option__icon--${option.accent || "primary"}`}>
                {option.icon}
              </span>
            )}
            <span className="habitry-select-option__content">
              <span className="habitry-select-option__label">{option.label}</span>
              {option.description && (
                <span className="habitry-select-option__description">{option.description}</span>
              )}
            </span>
            {isSelected && (
              <span className="habitry-select-option__check">
                <Check size={16} strokeWidth={2.5} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <div ref={rootRef} className="habitry-select-root">
      {name && <input type="hidden" name={name} value={value} readOnly />}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        className={`habitry-select-trigger ${isOpen ? "habitry-select-trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
      >
        {selectedOption?.icon && (
          <span className={`habitry-select-trigger__icon habitry-select-trigger__icon--${selectedOption.accent || "primary"}`}>
            {selectedOption.icon}
          </span>
        )}
        <span className="habitry-select-trigger__content">
          <span className="habitry-select-trigger__label">
            {selectedOption?.label || placeholder}
          </span>
          {selectedOption?.description && (
            <span className="habitry-select-trigger__description">{selectedOption.description}</span>
          )}
        </span>
        <ChevronDown size={18} className="habitry-select-trigger__chevron" />
      </button>

      {menu && createPortal(menu, document.body)}
    </div>
  );
};

export default Select;
