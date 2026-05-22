<template>
    <form
        class="form"
        :class="{ 'form--loading': submitting }"
        @submit.prevent="onSubmit"
    >
        <div class="form__top">
            <label class="form__label">
                Имя
                <input
                    v-model="form.name"
                    class="form__input"
                    :class="{ 'form__input--error': errors.name }"
                    placeholder="Введите имя"
                    autocomplete="off"
                    name="name"
                >
                <span v-if="errors.name" class="form__error">{{ errors.name }}</span>
            </label>
            <label class="form__label">
                Дата
                <date-picker
                    v-model="form.date"
                    format="DD.MM.YYYY"
                    value-type="format"
                    class="form__date-picker"
                    :class="{ 'form__date-picker--error': errors.date }"
                    placeholder="Укажите дату"
                />
                <span v-if="errors.date" class="form__error">{{ errors.date }}</span>
            </label>
        </div>
        <label class="form__label">
            Комментарий
            <textarea
                v-model="form.text"
                class="form__textarea"
                :class="{ 'form__textarea--error': errors.text }"
                placeholder="Оставьте свой комментарий"
                name="comment"
                rows="6"
            ></textarea>
            <span v-if="errors.text" class="form__error">{{ errors.text }}</span>
        </label>
        <template v-if="editingComment">
            <ButtonBase>
                <IconSave />
                Сохранить
            </ButtonBase>
            <ButtonBase
                type="danger"
                @click="cancelEdit"
            >
                <IconCancel />
                Отменить
            </ButtonBase>
        </template>
        <ButtonBase
            v-else
            :loading="submitting"
        >
            <IconSend />
            Отправить
        </ButtonBase>
    </form>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import ButtonBase from "./ui/ButtonBase.vue";
import IconSend from "./ui/icons/IconSend.vue";
import { mapActions } from 'vuex'
import IconSave from "./ui/icons/IconSave.vue";
import IconCancel from "./ui/icons/IconCancel.vue";

export default {
    name: "CommentForm",
    components: {
        IconCancel,
        IconSave,
        IconSend,
        ButtonBase,
        DatePicker
    },
    props: {
        submitting: {
            type: Boolean,
            default: false
        },
        editingComment: {
            type: Object,
            default: null
        },
        isEditing: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            form: {
                name: '',
                date: '',
                text: '',
            },
            errors: {
                name: '',
                date: '',
                text: '',
            }
        };
    },
    watch: {
        editingComment: {
            handler(value) {
                if(this.isEditing) {
                    this.form = {
                        name: value.name,
                        date: value.date,
                        text: value.text
                    };
                    this.clearErrors()
                }
            },
        },
        'form.name'(v) { if (v && v.trim()) this.errors.name = '' },
        'form.date'(v) { if (v) this.errors.date = '' },
        'form.text'(v) { if (v && v.trim()) this.errors.text = '' },
    },
    methods: {
        ...mapActions([
            'createComment',
            'updateComment'
        ]),
        validate() {
            const errors = { name: '', date: '', text: '' }
            if (!this.form.name || !this.form.name.trim()) errors.name = 'Введите имя'
            if (!this.form.date) errors.date = 'Укажите дату'
            if (!this.form.text || !this.form.text.trim()) errors.text = 'Введите текст комментария'
            this.errors = errors
            return !errors.name && !errors.date && !errors.text
        },
        async onSubmit() {
            if (!this.validate()) return

            if(this.isEditing) {
                await this.updateComment({id: this.editingComment.id, payload: this.form});
                this.cancelEdit()
            } else {
                await this.createComment(this.form);
                this.clearForm()
            }
        },
        cancelEdit() {
            this.$emit('cancelEdit');
            this.clearForm()
        },
        clearForm() {
            this.form = { name: '', date: '', text: '' };
            this.clearErrors()
        },
        clearErrors() {
            this.errors = { name: '', date: '', text: '' }
        }
    }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border-radius: 8px;
    background-color: var(--color-bg);
    box-shadow: var(--shadow-base);
}

.form--loading {
    opacity: 0.6;
    pointer-events: none;
}

.form__top {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 16px;
}

.form__label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}

.form__input,
.form__textarea {
    font-size: 14px;
    border: 1px solid var(--color-border);
    padding: 6px 10px;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.25s ease;
}

.form__input {
    height: 34px;
}

.form__textarea {
    resize: vertical;
}

.form__input:hover,
.form__input:focus,
.form__textarea:focus,
.form__textarea:hover {
    border: 1px solid var(--color-primary-hover);
}

.form__input--error,
.form__textarea--error,
.form__input--error:hover,
.form__input--error:focus,
.form__textarea--error:hover,
.form__textarea--error:focus {
    border-color: #FF4D4F;
}

.form__date-picker--error ::v-deep .mx-input {
    border-color: #FF4D4F;
}

.form__error {
    font-size: 12px;
    color: #FF4D4F;
}

.form__label * {
    width: 100%;
}

::v-deep .mx-input {
    transition: border-color 0.25s ease;
}

@media (min-width: 567px) {
    .form__top {
        flex-direction: row;
    }
}
</style>
