# SPDX-License-Identifier: GPL-2.0

ifeq ($(CONFIG_XPL_BUILD),)

ifeq ($(CONFIG_WEBUI_FAILSAFE_UI_OLD),y)
obj-y += fsdata_old/
else
obj-y += fsdata/
endif

obj-y += fs.o failsafe.o
obj-$(CONFIG_WEBUI_FAILSAFE_CONSOLE) += failsafe_console.o
obj-$(CONFIG_WEBUI_FAILSAFE_ENV) += failsafe_env.o
obj-$(CONFIG_WEBUI_FAILSAFE_BACKUP) += failsafe_backup_flash.o

endif
