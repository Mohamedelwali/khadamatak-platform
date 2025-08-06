from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        blank=True,
        help_text='المجموعات التي ينتمي إليها المستخدم',
        verbose_name='المجموعات'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
        help_text='صلاحيات المستخدم',
        verbose_name='الصلاحيات'
    )
    USER_TYPE_CHOICES = (
        ('service_provider', 'مقدم خدمة'),
        ('customer', 'عميل'),
    )
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default='customer',
        verbose_name='نوع المستخدم',
        help_text='حدد نوع الحساب: مقدم خدمة أو عميل'
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name='رقم الهاتف',
        help_text='رقم الهاتف للتحقق والتواصل'
    )
    phone_verified = models.BooleanField(
        default=False,
        verbose_name='الهاتف موثق',
        help_text='هل تم توثيق رقم الهاتف؟'
    )
    email_verified = models.BooleanField(
        default=False,
        verbose_name='البريد الإلكتروني موثق',
        help_text='هل تم توثيق البريد الإلكتروني؟'
    )
    location = models.JSONField(
        blank=True,
        null=True,
        verbose_name='الموقع الجغرافي',
        help_text='نقطة GeoJSON: {"type": "Point", "coordinates": [lng, lat]}'
    )
