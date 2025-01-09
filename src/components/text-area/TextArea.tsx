import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './textArea.module.scss'

import { Typography } from '../typography/Typography'

/**
 * Компонент TextArea - многострочное текстовое поле для ввода.
 *
 * @component
 * @param {TextAreaProps} props - Свойства компонента.
 * @param {string} [props.className] - Дополнительные CSS классы для контейнера компонента.
 * @param {boolean} [props.disabled=false] - Определяет, является ли поле ввода неактивным.
 * @param {string} [props.error] - Сообщение об ошибке, отображаемое под полем ввода.
 * @param {string} [props.id] - Идентификатор для поля ввода (не используется в коде напрямую, но может использоваться для связывания с label).
 * @param {string} [props.label='Text-area'] - Текст метки (label) для поля ввода.
 * @param {() => void} [props.onClear] - Функция-обработчик для очистки поля ввода (не реализовано в данном коде).
 * @param {string} [props.placeholder='Text-area'] - Текст-подсказка, отображаемый в поле ввода, когда оно пусто.
 * @param {string} [props.value] - Значение поля ввода.
 * @param {object} [props.rest] - Остальные свойства, которые будут переданы непосредственно в тег `<textarea>`.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ссылка на DOM-элемент `<textarea>`.
 *
 * @returns {JSX.Element} JSX-элемент, представляющий текстовое поле.
 *
 * @example
 * // Базовое использование
 * <TextArea label="Описание" placeholder="Введите описание"/>
 *
 * @example
 * // С сообщением об ошибке
 * <TextArea label="Email" placeholder="Введите email" error="Неверный формат email"/>
 *
 * @example
 * // С отключенным состоянием
 * <TextArea label="Комментарий" placeholder="Введите комментарий" disabled/>
 */

export type TextAreaProps = {
  error?: string
  label?: string
  onClear?: () => void
  placeholder?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<ElementRef<'textarea'>, TextAreaProps>((props, ref) => {
  const {
    className,
    disabled = false,
    error,
    id,
    label = 'Text-area',
    onClear,
    placeholder = 'Text-area',
    value,
    ...rest
  } = props

  const textareaClass = `${s.textArea} ${error ? s.isError : ''}`

  return (
    <div className={`${s.container} ${className}`}>
      {label && (
        <Typography as={'label'} className={s.label} htmlFor={'textarea'} option={'regular_text14'}>
          {label}
        </Typography>
      )}
      <textarea
        {...rest}
        className={textareaClass}
        disabled={disabled}
        id={'textarea'}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />

      {error && !disabled && (
        <Typography className={s.errorText} option={'regular_text14'}>
          {error}
        </Typography>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'
